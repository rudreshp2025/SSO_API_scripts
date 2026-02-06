const {expect} = require('@playwright/test');


class Responseverification{

    async validation(response, expectedstatus, expectedmessage,field ){
     console.log("[LOG] status",response.status());

     const body = await response.json();

 if (response.status() !== expectedstatus) {
  console.error("❌ API Error Response:", body);
}

        expect(response.status()).toBe(expectedstatus);

        //const body = await response.json();

        console.log("Response :",body);

      let actualerror;

 // CASE 1: error is a STRING
  if (typeof body.error === "string") {
    //expect(body.error).toBeDefined();
    actualerror = body.error;
  }

  // CASE 2: error is an OBJECT
  else if (typeof body.error === "object" && field) {
    //expect(body.error[field]).toBeDefined();
    actualerror = body.error[field];
  }

  // Case 3: print the token and move back to test
  else {
    console.log("");
    return body;
  }

        if (expectedmessage !== undefined){ 
           
            expect((actualerror).toLowerCase()).toContain(expectedmessage.toLowerCase());
        }

        return body;


    }

}
module.exports = new Responseverification();