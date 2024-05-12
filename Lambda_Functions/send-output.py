import json
import boto3
import time

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')
table_name = 'code-execution-status'
bucket_name = 'code-outputs-cc'


def lambda_handler(event, context):
    room_id = event['queryStringParameters']['roomId']
    flag = True

    while flag:
        time.sleep(0.5)
        response = dynamodb.get_item(
            TableName=table_name,
            Key={'RoomId': {'S': room_id}}
        )

        code_status = response['Item']['code_status']['S']
        if code_status != "Completed":
            continue
        else:
            # Fetch the file from S3 if completed
            flag = False
            file_key = f'{room_id}.txt'
            result = s3.get_object(Bucket=bucket_name, Key=file_key)
            file_content = result['Body'].read().decode('utf-8')

            # Delete the file from S3 after reading its contents
            s3.delete_object(Bucket=bucket_name, Key=file_key)

            # Return the content of the file
            return {
                'statusCode': 200,
                'output': file_content
            }