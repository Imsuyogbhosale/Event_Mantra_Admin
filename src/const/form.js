//Category
export const CategoryFormHeadData = [
  { key: "Sr.No", label: "Sr.No", sortTable: true },
  { key: "Category", label: "Category", sortTable: true },
  { key: "Sub Category", label: "Sub Category", sortTable: true },
  { key: "Action", label: "Action", sortTable: false },
];

export const CategoryFormBodyData = [
  {
    "Sr.No": 1,
    Category: "Events Decoration",
    "Sub Category":
      "Fabrication Decoration || Wedding Decoration || Birthday Decoration || Baby shower Decoration || Naming ceremony Decoration || Anniversary Decoration",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 2,
    Category: "Lights",
    "Sub Category":
      "Disco light || Frey light || Crystal light || laser lights || Rood show light",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 3,
    Category: "Decoration Product",
    "Sub Category":
      "Chair/ vip chair || Teble / Rounded table || Sofa / vip sofa",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 4,
    Category: "Decor",
    "Sub Category": "Clean",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 5,
    Category: "Halls",
    "Sub Category":
      "Disconnection wedding || Pre Wedding shoot location || 4/5/7 star hotel holl || Banquet halls || Small function hall AC / non - AC",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 6,
    Category: "Photographer",
    "Sub Category":
      "photographer || Videography || Pre wedding shoot || Drone camera || Instant photo booth",
    Action: "EDIT|DELETE",
  },
];
// Category Form
export const categoryFormBodyData = [
  {
    "Sr.No": 1,
    category: "Decoration Product",
    fields: [
      {
        Category: "",
        Title: "Traditional Photographer",
        Placeholder: "Candid",
        Type: "Checkbox",
        Action: "EDIT|DELETE",
      },
      {
        Category: "",
        Title: "Traditional Photographer",
        Placeholder: "Candid",
        Type: "Checkbox",
        Action: "EDIT|DELETE",
      },
    ],
  },
  {
    "Sr.No": 2,
    category: "Halls",
    fields: [
      {
        Category: "",
        Title: "Hall Name",
        Placeholder: "Details of Hall",
        Type: "Text Field",
        Action: "EDIT|DELETE",
      },
      {
        Category: "",
        Title: "Hall Name",
        Placeholder: "Details of Hall",
        Type: "Text Field",
        Action: "EDIT|DELETE",
      },
    ],
  },
  {
    "Sr.No": 3,
    category: "Events Planner",
    fields: [
      {
        Category: "",
        Title: "Oja",
        Placeholder: "	Ott",
        Type: "Text Field",
        Action: "EDIT|DELETE",
      },
      {
        Category: "",
        Title: "	Monopoly",
        Placeholder: "Enter Your Monopoly",
        Type: "	Text Field",
        Action: "EDIT|DELETE",
      },
    ],
  },
  // …
];

export const categoryFormHeadData = [
  { key: "Sr.No", label: "Sr.No", sortTable: true },
  { key: "Category", label: "Category", sortTable: true },
  { key: "Title", label: "Title", sortTable: false },
  { key: "Placeholder", label: "Placeholder", sortTable: true },
  { key: "Type", label: "Type", sortTable: true },
  { key: "Action", label: "Action", sortTable: false },
];

//  Subscription Form
export const subscriptionFormBodyData = [
  {
    "Sr.No": 1,
    category: "Events Planner",
    fields: [
      {
        Category: "Events Planner",
        Amount: "600",
        "Place Name": "Advanced	",
        Month: "6",
        Description: "Available:-Advance Feature",
        Action: "EDIT|DELETE",
      },
      {
        Category: "Events Planner",
        Amount: "	300",
        "Place Name": "Basic",
        Month: "3",
        Description:
          "Available:-Basic Plan Not Available:-No Phone Call Support",
        Action: "EDIT|DELETE",
      },
    ],
  },
  {
    "Sr.No": 2,
    category: "Events Decoration",
    fields: [
      {
        Category: "Events Decoration",
        Amount: "1000",
        "Place Name": "Platinum Plan	",
        Month: "12",
        Description:
          "Available:-Calling Enabled Available:-Email Support Not Available:-SMS No Support",
        Action: "EDIT|DELETE",
      },
      {
        Category: "Events Decoration",
        Amount: "		600",
        "Place Name": "Advanced	",
        Month: "6",
        Description: "	Available:-Advanced Feature",
        Action: "EDIT|DELETE",
      },
      {
        Category: "Events Decoration",
        Amount: "300",
        "Place Name": "Basic	",
        Month: "3	",
        Description:
          "Available:-Basic Feature Not Available:-No Phone Call Support",
        Action: "EDIT|DELETE",
      },
    ],
  },
];

export const subscriptionFormHeadData = [
  { key: "Sr.No", label: "Sr.No", sortTable: true },
  { key: "Category", label: "Category", sortTable: true },
  { key: "Amount", label: "Amount", sortTable: false },
  { key: "Place Name", label: "Place Name", sortTable: true },
  { key: "Month", label: "Month", sortTable: true },
  { key: "Description", label: "Description", sortTable: true },
  { key: "Action", label: "Action", sortTable: false },
];

export const vendorFormHeadData = [
  { key: "Sr.No", label: "Sr.No", sortTable: true },
  { key: "Category", label: "Category", sortTable: true },
  { key: "Sub Category", label: "Sub Category", sortTable: true },
  { key: "Mobile", label: "Mobile", sortTable: false },
  { key: "Package Price", label: "Package Price", sortTable: true },
  { key: "Starting From", label: "Starting From", sortTable: true },
  { key: "Language", label: "Language", sortTable: true },
  { key: "Location", label: "Location", sortTable: false },
  { key: "Profile Icon", label: "Profile Icon", sortTable: false },
  { key: "Status", label: "Status", sortTable: true },
  { key: "Action", label: "Action", sortTable: false },
];

export const vendorFormBodyData = [
  {
    "Sr.No": 1,
    Category: "Events Decoration",
    "Sub Category":
      "Fabrication Decoration || Wedding Decoration || Birthday Decoration || Baby shower Decoration || Naming ceremony Decoration || Anniversary Decoration",
    Mobile: "+91-9876543210",
    "Package Price": "₹2,000",
    "Starting From": "₹10,000",
    Language: "English, Marathi, Konkani",
    Location: "Maharashtra, Pune, Pincode: 411046",
    "Profile Icon": "icon",
    Status: "Active",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 2,
    Category: "Lights",
    "Sub Category":
      "Disco light || Frey light || Crystal light || Laser lights || Roof show light",
    Mobile: "+91-9876543210",
    "Package Price": "₹500",
    "Starting From": "₹50,000",
    Language: "Hindi, English, Marathi",
    Location: "Maharashtra, Pune, Pincode: 411046",
    "Profile Icon": "Icon",
    Status: "Active",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 3,
    Category: "Decoration Product",
    "Sub Category":
      "Chair / VIP chair || Table / Rounded table || Sofa / VIP sofa",
    Mobile: "+91-9876543210",
    "Package Price": "₹2,000",
    "Starting From": "₹15,000",
    Language: "English, Marathi",
    Location: "Maharashtra, Mumbai, Pincode: 400001",
    "Profile Icon": "Icon",
    Status: "Inactive",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 4,
    Category: "Decor",
    "Sub Category": "Clean",
    Mobile: "+91-9876543210",
    "Package Price": "₹1,000",
    "Starting From": "₹5,000",
    Language: "English",
    Location: "Maharashtra, Nagpur, Pincode: 440001",
    "Profile Icon": "Icon",
    Status: "Active",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 5,
    Category: "Halls",
    "Sub Category":
      "Destination wedding || Pre Wedding shoot location || 4/5/7 star hotel hall || Banquet halls || Small function hall AC / Non-AC",
    Mobile: "+91-9876543210",
    "Package Price": "₹10,000",
    "Starting From": "₹50,000",
    Language: "English, Marathi, Hindi",
    Location: "Maharashtra, Pune, Pincode: 411046",
    "Profile Icon": "Icon",
    Status: "Active",
    Action: "EDIT|DELETE",
  },
  {
    "Sr.No": 6,
    Category: "Photographer",
    "Sub Category":
      "Photographer || Videography || Pre wedding shoot || Drone camera || Instant photo booth",
    Mobile: "+91-9876543210",
    "Package Price": "₹3,000",
    "Starting From": "₹20,000",
    Language: "English, Hindi",
    Location: "Maharashtra, Pune, Pincode: 411046",
    "Profile Icon": "Icon",
    Status: "Inactive",
    Action: "EDIT|DELETE",
  },
];
