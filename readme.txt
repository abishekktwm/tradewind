Hello
This is my implementation of the Twitter-like single-user micro blog timeline. I have used Angular framework to implement the features. It is also hosted at https://kartheekpathuri.github.io/ .

Please note the following:-

* [x] Every post must have the user identifiers: name, real name, photo, and verified status
* The zeplin spec did not show these identifiers for the current (better) user, hence I have omitted them
      
* [x] Replies should be nested under the posts they are replying to. Chains of replies, i.e. threads, must be logically unlimited (i.e. there can be an unlimited number of replies to replies), but you can add visual limits to nesting if you choose.
* Reply interaction was not specified, so I am using the message entry box
* Click on reply on post, type message in entry box and click send icon or hit 'Enter'
* Since unlimited chaining cannot be visually represented on the same page, they are all shown as reply messages but nested under         their respective parent
* Replies are not styled inthe green color as the zeplin spec mentioned green only for new posts
* Replies have the image on the left as per reply zeplin spec
* Reply button turns red on clicking, till the reply message is sent 
      
* [x] The timestamp for each post should be updated in real time.
* The timestamp text is slightly different from the spec but is real time neverthless
* Like button turns red on liking     

Thank you,
Kartheek Pathuri