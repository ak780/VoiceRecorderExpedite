



Approach:

The present project covers the audio chunk upload, merging of audio chunks and deletion of audio files, but with regards to S3 bucket. This is achieved through the use of AWS services especially AWS S3 for file storage and AWS Lambda for serverless computing. The objectives of the system are:

Uploading Audio Chunks: Every audio chunk is uploaded into the S3 bucket in binary buffer format and the back end of the system records it against a specific session.

Merging Audio Chunks: The backend system fetches all audio chunks pertaining to a singular session, combines them into one audio file and uploads the completed file back to the S3 bucket and returns signed url.

Deleting Audio files: The backend is able to delete one audio file or all the chunks associated with one session after a single audio file has been created.

The backend system receives HTTP requests for the recording of actions and based on these requests, the system will determine the correct action, for example, if adding, merging or removing audio files is required, the system is ready to perform the specified action.



Design Decisions:

React:
For the front end development so that state management, UI updates and user events becomes easier.

UUID:
A particular recording session is tracked by generating a unique session ID with the uuid library. If a user refershed a page it is a new session.

S3:
The audio files consisting of separate parts and the merged file are stored on AWS S3, which has scalability, durability and cost efficient characteristics if compared to     DynamoDB.

Lambda:
The functions for uploading, merging and deleting audio files are handled by AWS Lambda, which is advantageous due to its serverless on demand design with           reduced costs and automatic scaling.

MediaRecorder API:
This integrated web API allows the audio part to be recorded which are later sent to the backend.



Challenges and Trade-offs:

Security Validations:
The backend utilizes AWS privileges properly via the use of IAM roles. With signed URLs it is also possible to control the time for which files are available and discourage their misuse.

Managing Large Audio Files:
The uploading and merging of voice files in chunks scattered over multiple large audio files could be a lengthy procedure. To address this issue, we break down the audio into smaller parts; in this way, my users will not have to sit and wait for big chunk files to be uploaded but instead upload small portions of audio at a time.

CORS Issue:
There was CORS error when calling the lambda url. Took sometime to debug and was fiedx by adding correct headers.
