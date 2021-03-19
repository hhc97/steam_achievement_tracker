## Overall comments  
  
- Well done overall. You have made great progress since the last meeting. Good job!  
- The theme between pages is coherent.  
- You could add a footer.  
- Some of the following points may be suggestions I can give, not points deduction.  
  
## Instructions Clarity  
  
- The instructions in the README are clear and detailed. Running start.sh is quite convenient.  
  
## Layout: Overall Layout  
  
- Overall layout is good, but you may still need to pay attention to the details of the page.  
  
## Layout: Views  
  
- The styles of the log-in form and sign-up form seem not to match with pages very well.  
- The React icon in the navbar is misleading sometimes. You could have your own app icon in phase2.  
- One concern for the review, now each review component shows all the content of the review. If the length of the review is very long, the height of that component could be much higher than others. You may need to consider give length constriction to the review or you could show part of the content in the list and have a detail page for the review to show the full content.  
  
Dashboard  
  
- The position of the message box can be on the right side. Now it seems a little bit left. You could refer to the message box of Linkedin to get some thoughts.  
  
## Usability: User interactions  
  
Sign Up Page  
  
- It will be better if you could restrict the format of the password(e.g., length, special character something like that.)  
  
Dashboard  
  
- You may need to think about if a user clicks on a specific game and go to the Game achievements page, how could they go back to the dashboard. Click on the react icon seems not obvious for a regular user to go back.  
- The user interaction of the message is pretty cool.  
  
Account Setting  
  
- Expected to see the profile picture get updated if a user uploads a new image.  
  Analytics  
- The sorting function of the form is cool.  
  
Forum  
  
- For the search bar, it will be better if a user could hit the enter button by the keyboard.  
- After the user gets the search result, how could he go back to the original post list. Now it seems like I have to empty the input of the search bar and click on the Enter. Even if I click on the Forum in the nav bar, it can not bring me to the previous forum page.  
- The text field of adding review should be emptied if the user has already submitted the review.  
- The author of the review just added is unknown, I think it is supposed to be the username of the current user.  
  
admin  
  
- I think there is no need for the admin to have the same pages as regular users. (e.g. dashboard of game achievement, message system, analytics). You may need to know the role of the admin and reconsider the necessary views and features for the admin. You could just direct admin to the admin page after logging in.  
  
## Server call indicators  
  
As specified in the handout, needs comment for server call indication. There are areas where a server call may be necessary that were not indicated in the code using comments.  
