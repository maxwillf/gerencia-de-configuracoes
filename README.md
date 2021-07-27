# Gerencia de configurações

## Comandos de backend 

curl -X GET "http://localhost:8080/account/extract/{accountId}"

curl -X POST "http://localhost:8080/account/create/{accountId}"

curl -X POST -H "Content-type: application/json" -d "2.0" "http://localhost:8080/account/{accountId}/credit"

curl -X POST -H "Content-type: application/json" -d "2.0" "http://localhost:8080/account/{accountId}/debit"

curl -X POST -H "Content-type: application/json" -d "3.0" "http://localhost:8080/account/{fromAccountId}/transfer/{toAccountId}"



