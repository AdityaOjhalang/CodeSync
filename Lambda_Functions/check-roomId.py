import boto3

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
        KeyConditionExpression='RoomID = :roomId',
        ExpressionAttributeValues={
            ':roomId': roomId
        }
    )

    # Check if any items were found
    if response.get('Items'):
        return {
            'statusCode': 200,
            'body': f"Room ID {roomId} exists and has {len(response['Items'])} records."
        }
    else:
        return {
            'statusCode': 404,
            'body': "Room ID not found."
        }
