import json
import boto3

dynamodb = boto3.client('dynamodb')
table_name = 'Room-details'

def lambda_handler(event, context):
    room_id = event['queryStringParameters']['roomId']
    user_id = event['queryStringParameters']['userId']

    try:
        response = dynamodb.get_item(
            TableName=table_name,
            Key={'RoomID': {'S': room_id}}
        )
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': "Error accessing DynamoDB"
        }

    if 'Item' in response:
        item = response['Item']
        # Check if user_id matches
        if item['UserID']['S'] == user_id:
            # Update isActive to False
            try:
                update_response = dynamodb.update_item(
                TableName=table_name,
                Key={'RoomID': {'S': room_id}},
                UpdateExpression='SET isActive = :val',
                ExpressionAttributeValues={':val': {'S': "false"}}
            )
                return {
                    'statusCode': 200,
                    'body': "isActive set to False successfully"
                }
            except Exception as e:
                print(e)
                return {
                    'statusCode': 500,
                    'body': "Failed to update item in DynamoDB"
                }
        else:
            return {
                'statusCode': 200,
                'body': "User is not the room owner"
            }
    else:
        return {
            'statusCode': 404,
            'body': "RoomId not found"
        }

