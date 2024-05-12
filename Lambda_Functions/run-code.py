import json
import boto3
import requests

s3 = boto3.client('s3')
API_ENDPOINT = 'http://3.92.21.88:5000/execute'  # Update with your actual endpoint


def lambda_handler(event, context):
    for record in event['Records']:
        bucket = 'code-submissions-cc'
        key = record['key']

        response = s3.get_object(Bucket=bucket, Key=key)
        python_code = response['Body'].read().decode('utf-8')

        # Sending the Python code to the Flask API
        api_response = requests.post(API_ENDPOINT, json={'code': python_code})
        if api_response.status_code == 200:
            output = api_response.json()['output']
            # Save the output to a different S3 bucket
            output_bucket = 'code-outputs-cc'  # Specify your output bucket name
            output_key = 'output_' + key.split('.')[0] + '.txt'  # Appending .txt to make it a text file
            s3.put_object(Body=output, Bucket=output_bucket, Key=output_key)
        else:
            print(f"Error: {api_response.text}")

    return {
        'statusCode': 200,
        'body': json.dumps('Code execution completed.')
    }
