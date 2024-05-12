import json
import boto3
import requests

s3 = boto3.client('s3')
sqs = boto3.client('sqs')
API_ENDPOINT = 'http://3.92.21.88:5000/execute'


def lambda_handler(event, context):
    for record in event['Records']:
        bucket = 'code-submissions-cc'

        message_body = json.loads(record['body'])
        key = message_body['key']

        response = s3.get_object(Bucket=bucket, Key=key)
        python_code = response['Body'].read().decode('utf-8')

        api_response = requests.post(API_ENDPOINT, json={'code': python_code})
        if api_response.status_code == 200:
            output = api_response.json()['output']
            output_bucket = 'code-outputs-cc'
            output_key = 'output_' + key.split('.')[0] + '.txt'
            s3.put_object(Body=output, Bucket=output_bucket, Key=output_key)

            sqs.delete_message(
                QueueUrl='https://sqs.us-east-1.amazonaws.com/654654423800/code-submits',
                ReceiptHandle=record['receiptHandle'])
        else:
            print(f"Error: {api_response.text}")

    return {
        'statusCode': 200,
        'body': json.dumps('Code execution completed.')
    }
