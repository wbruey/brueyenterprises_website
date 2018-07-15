import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from firebase_admin import db

print("Starting Script....")

cred = credentials.Certificate('../firebase/brutest-3228a-firebase-adminsdk-bex36-272252f791.json')
default_app = firebase_admin.initialize_app(cred, {'databaseURL':'https://brutest-3228a.firebaseio.com/'})
print (default_app.name)

ref=db.reference('/')
ref.set(
{
  "text" : "hey collin happy days"
}
)


print("Script Complete")




