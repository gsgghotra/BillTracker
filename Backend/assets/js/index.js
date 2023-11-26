import 'dotenv/config';
import db from "./firebase.js";

//Import Scrapers
import BritishGas from "./BritishGas.js";
import AffinityWater from "./AffinityWater.js";

const Returneddata = [
    {
        "BritishGas": "Empty"
    },
    {
        "AffinityWater": "Empty"
    }
]
//Organise the scrapers and DB management
const scrapersManager = async () => {
    try{
        // Run the Affinity Water scraper first
        const affinityWaterResult = await AffinityWater();
        //Store in the object intialised above
        Returneddata[0].AffinityWater = affinityWaterResult;
        console.log('Affinity Water Result:', affinityWaterResult);

        // then Run the British Gas scraper
        const britishGasResult = await BritishGas();
        Returneddata[0].BritishGas = britishGasResult;
        console.log('British Gas Result:', britishGasResult);

        // Add results to the database
        const addBills = {
            affinitywaterStatus: Returneddata[0].AffinityWater,
            BritishGasStatus: Returneddata[0].BritishGas,
        };

        // Specify the collection and document ID
        const collectionName = 'users';
        const documentId = 'gurjeet'; // replace with the actual document ID

        // Reference to the collection and document
        const collectionRef = db.collection(collectionName);
        const documentRef = collectionRef.doc(documentId);

        // Add the document to the collection
        await documentRef.set(addBills);

        console.log('Bills added successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

//Run the Scraper Manager
scrapersManager();