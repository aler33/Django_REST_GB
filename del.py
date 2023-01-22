import requests

response = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username':
'admin', 'password': '123'})

print(response.status_code) # 200
print(response.json()) # {'token': '2efa08beed5727856319740df3747df4e0a3655e'}