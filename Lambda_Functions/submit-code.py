import json
import boto3
import uuid

s3 = boto3.client('s3')
sqs = boto3.client('sqs')
dynamodb = boto3.client('dynamodb')
dynamodb_table_name = 'code-execution-status'

def lambda_handler(event, context):

    room_id = event['queryStringParameters']['roomId']

    # Configuration
    bucket_name = 'code-submissions-cc'  
    queue_url = 'https://sqs.us-east-1.amazonaws.com/654654423800/code-submits'  
    file_content = event['queryStringParameters']['code']  
    file_name = f'{room_id}_script.py' 

    # Upload to S3
    s3.put_object(Bucket=bucket_name, Key=file_name, Body=file_content)

    # Send message to SQS
    response = sqs.send_message(QueueUrl=queue_url, MessageBody=json.dumps({'key': file_name}))
    
    response_dynamodb = dynamodb.put_item(
        TableName=dynamodb_table_name,
        Item={
            'RoomId': {'S': room_id},
            'code_status': {'S': 'Pending'}
        }
    )

    return {
        'statusCode': 200,
        'body': json.dumps('File uploaded and message sent successfully!')
    }
