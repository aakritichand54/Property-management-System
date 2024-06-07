//DROP//

db.advertisement.drop();
db.property.drop();

//CREATE COLLECTION//

db.createCollection("advertisement");
db.advertisement.insert({ 
    "advertisement_no" : "E001", 
    "advertisement_date" : ISODate("2023-01-02T01:11:18.965+0000"), 
    "media_of_advertisement" : {
        "media_name" : [
            "Instagram", 
            "Snapchat", 
            "Facebook", 
            "Newspaper"
        ]
    }
}) 
db.advertisement.insert({ 
    "advertisement_no" : "E002", 
    "advertisement_date" : ISODate("2023-02-02T01:11:18.965+0000"), 
    "media_of_advertisement" : {
        "MEDIA_NAME" : [
            "Instagram", 
            "Snapchat", 
            "Facebook", 
            "Newspaper"
        ]
    }
});
db.advertisement.find();


db.createCollection("property");

db.property.insert({ 
   "property_no" : "A111", 
    "property_type" : "Commercial", 
    "owner_of_property" : {
        "owner_no" : "1111", 
        "street_no" : "1256", 
        "street" : "Broadway", 
        "city" : "Bradford", 
        "province" : "Barnet", 
        "postal_code" : "ABC123", 
        "private_owner" : {
            "private_owner_name" : "AAKRITI CHAND" 
        }
    }, 
    "lease_agreement" : {
        "leae_agreement_id" : "0001", 
        "signing_date" : ISODate("2023-10-02T01:11:18.965+0000"), 
        "starting_date" : ISODate("2023-10-02T01:11:18.965+0000"), 
        "ending_date" : ISODate("2023-10-02T01:11:18.965+0000")
    }, 
    "tenant" : {
        "tenant_no" : "Q101", 
        "private_tenant" : {
            "private_tenant_name" : "YOUBRAJ SINGH", 
        }
    }
    }); 
db.property.insert({ 
    "property_no" : "C333", 
    "property_type" : "Residential", 
    "owner_of_property" : {
        "owner_no" : "2222", 
        "street_no" : "2834", 
        "street" : "MillRoad", 
        "city" : "Cambridge", 
        "province" : "Armagh", 
        "postal_code" : "FGH224", 
        "business_Owner" : {
            "business_owner_name" : "KAMALA ADHIKARI"
        }
    }, 
    "lease_agreement" : {
        "lease_Agreement_Id" : "0004", 
        "signing_date" : ISODate("2023-09-02T01:11:18.965+0000"), 
        "starting_date" : ISODate("2023-09-02T01:11:18.965+0000"), 
        "ending_date" : ISODate("2023-09-02T01:11:18.965+0000")
    }, 
    "tenant" : {
        "tenant_no" : "T404", 
        "business_tenant" : {
            "business_name" : "AAKRITI LIQOUR"
        }
    }
}); 
db.property.insert({ 
    "property_no" : "D444", 
    "property_type" : "Residential", 
    "owner_of_property" : {
        "owner_no" : "4444", 
        "street_no" : "1830", 
        "street" : "Kingsway", 
        "city" : "Sunderland", 
        "province" : "Dorset", 
        "postal_code" : "DFR558", 
        "business_Owner" : {
            "business_owner_name" : "SARA"
        }
    }, 
    "lease_agreement" : {
        "lease_Agreement_Id" : "0003", 
        "signing_date" : ISODate("2023-02-15T01:11:18.965+0000"), 
        "starting_date" : ISODate("2023-02-15T01:11:18.965+0000"), 
        "ending_date" : ISODate("2024-02-15T01:11:18.965+0000")
    }, 
    "tenant" : {
        "tenant_no" : "T303", 
        "business_tenant" : {
            "business_name" : "Sara food"
        }
    } 
  
});
db.property.find()

//QUERIES//

// JOIN//

 db.property.aggregate([
  {
    $lookup: {
      from: "lease_agreement",
      localField: "property_no",
      foreignField: "property_no",
      as: "LEASE_AGREEMENT"
    }
  },
  {
    $lookup: {
      from: "tenant",
      localField: "tenant_no",
      foreignField: "tenant_no",
      as: "tenant"
    }
  }
]);

//UNION//

db.advertisement.aggregate( [
{ $set: { _id: "$_id" } },
{ $unionWith: { coll: "advertisement", pipeline: [ { $set: { _id: "$_id" } } ] } },
{ $sort: { advertisement_no : 1, advertisement_date : -1} }
] );



// NESTED//

db.property.aggregate([
  { $lookup: {
      from: "property",
      localField: "property_no",
      foreignField: "property_no",
      as: "property"
    }
  },
  { $match: { "property.property_type": "Residential" } }
])



//TIME STAMP//

ObjectId("64120b240000000000000000").getTimestamp();
ISODate("2023-03-15T18:15:00.000Z");

db.advertisement.find({
  $expr: {$eq: [{"$month": "$advertisement_date"},01]  }
});


//OLAP//
///PARTITION////
db.advertisement.aggregate( [
   {
      $group: {
         _id: "$advertisement_date",
         countNumberOfadvertisement: {
            $count: {}
         }
      }
   }
] );


 
 



