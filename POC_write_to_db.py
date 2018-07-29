import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from firebase_admin import db

print("Starting Script....")

cred = credentials.Certificate('../firebase/brutest-3228a-firebase-adminsdk-bex36-272252f791.json')
default_app = firebase_admin.initialize_app(cred, {'databaseURL':'https://brutest-3228a.firebaseio.com/'})
print (default_app.name)

ref=db.reference('/')

#This stuff below creaes a json tree in the database if it doesn't already exist
"""
ref.set({
        'boxes': 
            {
                'box001': {
                    'color': 'red',
                    'width': 1,
                    'height': 3,
                    'length': 2
                },
                'box002': {
                    'color': 'green',
                    'width': 1,
                    'height': 2,
                    'length': 3
                },
                'box003': {
                    'color': 'yellow',
                    'width': 3,
                    'height': 2,
                    'length': 1
                }
            }
        }
)
"""

ref = db.reference('box001')
ref.update({'color':'Bruester2'})
#box_ref = ref.child('box001')
#box_ref.update({
#    'color': 'BRUESTER'
#})

print("Script Complete")




