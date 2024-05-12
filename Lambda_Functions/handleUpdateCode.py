import os
import boto3
import json

def lambda_handler(event, context):
    print("Received event:", event)
    
    message = json.loads(event['body'])
    print("Decoded message:", message)  # Check what the message contains
    
    try:
        room_id = message['roomId']
    except KeyError:
        print("roomId not found in the message")
        return {'statusCode': 400, 'body': json.dumps("roomId is missing in the request")}

    # message = json.loads(event['body'])
    connection_id = event['requestContext']['connectionId']

    # Retrieve environment variables
    api_id = os.environ['API_ID']
    region = os.environ['API_REGION']
    stage = os.environ['API_STAGE']

    # Initialize DynamoDB and API Gateway Management Client
    dynamodb = boto3.resource('dynamodb')
    endpoint_url = f"https://{api_id}.execute-api.{region}.amazonaws.com/{stage}"
    client = boto3.client('apigatewaymanagementapi', endpoint_url=endpoint_url)

    # Retrieve all connections for this room
    table = dynamodb.Table('WebSocketConnections')
    room_id = message['roomId']
    updated_code = message['code']

    response = table.scan(
        FilterExpression='RoomID = :room_id',
        ExpressionAttributeValues={':room_id': room_id}
    )

    # Broadcast the updated code to all clients in the room except the sender
    for item in response['Items']:
        if item['ConnectionID'] != connection_id:
            try:
                client.post_to_connection(
                    ConnectionId=item['ConnectionID'],
                    Data=json.dumps({'action': 'updateCode', 'code': updated_code})
                )
            except client.exceptions.GoneException:
                # Handle the case where the connection is no longer available
                print(f"Connection {item['ConnectionID']} has been disconnected.")
    
    return {'statusCode': 200}
