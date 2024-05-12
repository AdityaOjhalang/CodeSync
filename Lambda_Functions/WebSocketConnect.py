import boto3
import json

def lambda_handler(event, context):
    # Get connection ID and potentially other details
    connection_id = event['requestContext']['connectionId']
    
    # You could log the connection or add additional logic here
    print(f"New connection: {connection_id}")
    
    # Optionally, you can store connection details in DynamoDB
    # For example, if you want to track active connections or associate them with user data
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('WebSocketConnections')
    
    # Assume you pass room_id when connecting, e.g., wss://endpoint?room_id=xxx
    room_id = event['queryStringParameters']['roomId']
    
    # Store the connection data
    table.put_item(
        Item={
            'ConnectionID': connection_id,
            'RoomID': room_id,
            'ConnectedAt': context.aws_request_id  # Example of additional data
        }
    )

    return {'statusCode': 200}
