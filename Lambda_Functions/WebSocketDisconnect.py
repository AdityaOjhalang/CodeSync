import boto3
import json

def lambda_handler(event, context):
    connection_id = event['requestContext']['connectionId']
    
    # Log the disconnection
    print(f"Disconnected: {connection_id}")

    # Remove the connection from DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('WebSocketConnections')

    # Delete the item based on connection ID
    table.delete_item(
        Key={
            'ConnectionID': connection_id
        }
    )

    return {'statusCode': 200}
