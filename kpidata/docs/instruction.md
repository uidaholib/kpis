The Instruction form is now set up to generate the Instruction KPIs, via the `instruction-prep.html` page. 

To create the official instruction numbers, add the new semester's data to the `/kpidata/instruction-from-form.csv`  -- you will need to move the session column and add a count_x_session column to make them fit together correctly. 

Once that's added, you can run the server or push the changes and go to `/instruction-prep.html` -- there, on the Table tab, you will be able to copy all the relevant data for your desired semester. 

Actually --> You'll likely need to copy the whole thing, add to a blank spreadsheet and then copy the rows you need. 

Go to the Library KPIs data Google Sheet from there and add that data in, then download that tab as a CSV. Open that CSV in VSCode, copy the data, and paste it over the data in `/kpidata/instruction.csv`

Once you update the data and push the changes, the main site will rebuild with that data. 