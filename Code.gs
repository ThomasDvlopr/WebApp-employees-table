function doGet(){
  let template = HtmlService.createTemplateFromFile("index"); // It will create HTMl page from Index.html file data.

  const data = getData();

  template.data = data; 

  let pageData = template
    .evaluate()
    .setTitle("Employees") // Set Title
    .setSandboxMode(HtmlService.SandboxMode.IFRAME) //This method now has no effect — previously it set the sandbox mode used for client-side scripts
    .addMetaTag("viewport", "width=device-width, initial-scale=1") // important tag for Responsiveness
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Sets the state of the page's X-Frame-Options header, which controls clickjacking prevention.
  return pageData;
};

function getData(){
 const ss = SpreadsheetApp.openById("1dO2WQYpN0ZQ-Lf8PegXchjM8XOEUAvbRIA_oY22UvlA");
  const sheet = ss.getSheetByName('employees')
  let data;
  
  if(isAdmin()){
    data = sheet.getDataRange().getValues();
  } else {
    data = sheet.getRange(1,1, sheet.getLastRow(), 5).getValues();
  }
  return data
}

function isAdmin(){
  const ss = SpreadsheetApp.openById("1dO2WQYpN0ZQ-Lf8PegXchjM8XOEUAvbRIA_oY22UvlA");
  const editors = ss.getEditors().map(user => user.getEmail());
  const currentUser = Session.getActiveUser().getEmail();
  return editors.includes(currentUser);
}


