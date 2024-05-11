import json
import boto3
import uuid
import logging
from datetime import datetime


# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)  # You can adjust this to DEBUG or ERROR as needed

def lambda_handler(event, context):
    # Extract user data from the event. Adjust keys based on your test JSON structure
    user_id = event['user_id']
    user_details = event.get('user_details', {})

    # Generate a unique RoomID
    room_id = str(uuid.uuid4())

    # Initialize a DynamoDB client
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Room-details')  # Make sure to use your actual table name
    
    current_time = datetime.now().isoformat() 

    # Prepare the item to store in DynamoDB
    item = {
        'RoomID': room_id,
        'UserID': user_id,
        'IsActive': True,  # Assuming a new room is active by default
        'UserDetails': user_details,  # Store additional user details if provided
        'CreatedAt': current_time  # Current timestamp
    }

    # Store the data in DynamoDB
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
