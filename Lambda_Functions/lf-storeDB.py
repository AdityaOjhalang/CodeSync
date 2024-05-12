import json
import boto3
import uuid
import logging
from datetime import datetime

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)  

def lambda_handler(event, context):
    # Log the incoming event
    logger.info(f"Received event: {event}")

    # Extract the user ID from Cognito claims passed by API Gateway
    user_id = event['requestContext']['authorizer']['claims']['sub']
    
    # Assuming user details are passed as a JSON string in queryStringParameters
    user_details_str = event.get('queryStringParameters', {}).get('user_details', '{}')
    user_details = json.loads(user_details_str)  # Parse JSON string into Python dictionary

    # Generate a unique RoomID
    room_id = str(uuid.uuid4())

    # Initialize a DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Room-details')  
    
    current_time = datetime.now().isoformat()

    # Prepare the item to store in DynamoDB
    item = {
        'RoomID': room_id,
        'UserID': user_id,
        'IsActive': True,
        'UserDetails': user_details,  # Storing parsed user details
        'CreatedAt': current_time
    }

    # Attempt to store the data in DynamoDB
    try:
        response = table.put_item(Item=item)
        logger.info(f"Item stored successfully: {item}")
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Room created successfully',
                'RoomID': room_id
            })
        }
    except Exception as e:
        logger.error(f"Error storing item: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Failed to create room',
                'error': str(e)
            })
        }
