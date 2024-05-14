import boto3
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Room-details')

def lambda_handler(event, context):
    # Get roomId from the query string parameters
    roomId = event.get('queryStringParameters', {}).get('roomId')

    if not roomId:
        return {
            'statusCode': 400,
            'body': "Room ID is required."
        }

    # Query DynamoDB to check for the roomId
    response = table.query(
        KeyConditionExpression=Key('RoomID').eq(roomId)
    )

    # Check if any items were found
    if response.get('Items'):
        room = response['Items'][0]
        # Check if the room is active
        if room.get('IsActive') == True:
            return {
                'statusCode': 200,
                'body': f"Room ID {roomId} exists and is active."
            }
        else:
            return {
                'statusCode': 404,
                'body': "Room ID not found or not active."
            }
    else:
        return {
            'statusCode': 404,
            'body': "Room ID not found."
        }
