# slack_notification

## 概要
Amazon Lambdaを使用してSlackに通知を投げます
使用言語： node.js

## できること
Lambda functionが呼び出されるとSlackに通知が飛ぶ

## 使用例
#### サーバー監視
・SlackにIncoming Webhookを導入する

・EC2にCloudWatchを入れてアラーム設定を行う

・SNSでトピックを作成する

・Lambdaの設定

  AWS Roleを設定
  
    「Lambda function handler and role」にある、「Role」を「Create new role -> * Basic execution role」に設定
    
  イベントソースで作成したトピックを選択
