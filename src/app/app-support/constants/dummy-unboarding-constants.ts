export const onboardingProgressArray = [
    {
        name: 'What is this about?',
    },
    {
        name: 'Registration',
    },
    {
        name: 'Expertise',
    },
    {
        name: 'Profiling',
    },
    {
        name: 'Availability',
    },
    {
        name: 'Agreements',
    },
];

export const coachUnboardingData2 = {
    setUp: {
        progressLevel: 0,
        highestProgressLevel: 0,
        steps: [
            {
                name: 'Step 1',
                number: 1
            },
        ]
    }
};

export const requestInvite = {
    "registration": {
        "fristName": "",
        "lastName": "",
        "email": "",
        "country": "",
        "expertiseUrl": "",
    },
}

export const coachUnboardingData = {
    "userStepsTracker": [
        {
          "id": 1,
          "name": "What is this about?",
          "isCompleted": false,
          "isOpen": true
        },
        {
          "id": 2,
          "name": "Registration",
          "isCompleted": false,
          "isOpen": false
        },
        {
          "id": 3,
          "name": "Expertise",
          "isCompleted": false,
          "isOpen": false
        },
        {
          "id": 4,
          "name": "Profiling",
          "isCompleted": false,
          "isOpen": false
        },
        {
          "id": 5,
          "name": "Availability",
          "isCompleted": false,
          "isOpen": false
        },
        {
          "id": 6,
          "name": "Agreements",
          "isCompleted": false,
          "isOpen": false
        },
    ],
    "profilePages": {
        "registrationPage": {
            "fristName": "",
            "lastName": "",
            "username": "",
            "email": "",
            "password": "",
        },
        "professionalInformationPage": {
            "jobTitle": "",
            "companyName": "",
            "industryName": "",
            "countryId": 0,
            "cityName": "",
            "professionalSummary": "",
            "coachDomains": [],
        },
        "profileMediaPage":{
            "profilePicture": "",
            "profileVideoAttachedLink": "",
            "profileVideoWrittenLink": "",
        },
        "availabilityPage": {
            "hourlyRate": 0,
            "startDate": "",
            "endDate": "",
            "timeZone": "",
            "alwaysAvailable": false,
            "serviceScheduling": {
                "sunday": {
                    "active": false,
                    "hours": []
                },
                "monday": {
                    "active": false,
                    "hours": []
                },
                "tuesday": {
                    "active": false,
                    "hours": []
                },
                "wednesday": {
                    "active": false,
                    "hours": []
                },
                "thursday": {
                    "active": false,
                    "hours": []
                },
                "friday": {
                    "active": false,
                    "hours": []
                },
                "saturday": {
                    "active": false,
                    "hours": []
                },
            },
        },
        "agreementPage": {
            "expertiseCommitment": "",
            "consultationOutline": "",
            "agreeToTerms": false
        },
    },
    "isCompleted": false,
    "currentPageNumber": 1,
    "userId": "aa5e77f4-4149-4ac1-b494-5eec6dac77e2"
}


export const timeList = [
    { time: '12:00 AM', value:'0.0' },
    { time: '12:30 AM', value:'0.5' },
    { time: '1:00 AM', value:'1.0' },
    { time: '1:30 AM', value:'1.5' },
    { time: '2:00 AM', value:'2.0' },
    { time: '2:30 AM', value:'2.5' },
    { time: '3:00 AM', value:'3.0' },
    { time: '3:30 AM', value:'3.5' },
    { time: '4:00 AM', value:'4.0' },
    { time: '4:30 AM', value:'4.5' },
    { time: '5:00 AM', value:'5.0' },
    { time: '5:30 AM', value:'5.5' },
    { time: '6:00 AM', value:'6.0' },
    { time: '6:30 AM', value:'6.5' },
    { time: '7:00 AM', value:'7.0' },
    { time: '7:30 AM', value:'7.5' },
    { time: '8:00 AM', value:'8.0' },
    { time: '8:30 AM', value:'8.5' },
    { time: '9:00 AM', value:'9.0' },
    { time: '9:30 AM', value:'9.5' },
    { time: '10:00 AM', value:'10.0' },
    { time: '10:30 AM', value:'10.5' },
    { time: '11:00 AM', value:'11.0' },
    { time: '11:30 AM', value:'11.5' },
    { time: '12:00 PM', value:'12.0' },
    { time: '12:30 PM', value:'12.5' },
    { time: '1:00 PM', value:'13.0' },
    { time: '1:30 PM', value:'13.5' },
    { time: '2:00 PM', value:'14.0' },
    { time: '2:30 PM', value:'14.5' },
    { time: '3:00 PM', value:'15.0' },
    { time: '3:30 PM', value:'15.5' },
    { time: '4:00 PM', value:'16.0' },
    { time: '4:30 PM', value:'16.5' },
    { time: '5:00 PM', value:'17.0' },
    { time: '5:30 PM', value:'17.5' },
    { time: '6:00 PM', value:'18.0' },
    { time: '6:30 PM', value:'18.5' },
    { time: '7:00 PM', value:'19.0' },
    { time: '7:30 PM', value:'19.5' },
    { time: '8:00 PM', value:'20.0' },
    { time: '8:30 PM', value:'20.5' },
    { time: '9:00 PM', value:'21.0' },
    { time: '9:30 PM', value:'21.5' },
    { time: '10:00 PM', value:'22.0' },
    { time: '10:30 PM', value:'22.5' },
    { time: '11:00 PM', value:'23.0' },
    { time: '11:30 PM', value:'23.5' },
];

export const timeListTranslation = {
    '0': '12:00 AM',
    '0.5': '12:30 AM',
    '1': '1:00 AM',
    '1.5': '1:30 AM',
    '2': '2:00 AM',
    '2.5': '2:30 AM',
    '3': '3:00 AM',
    '3.5': '3:30 AM',
    '4': '4:00 AM',
    '4.5': '4:30 AM',
    '5': '5:00 AM',
    '5.5': '5:30 AM',
    '6': '6:00 AM',
    '6.5': '6:30 AM',
    '7': '7:00 AM',
    '7.5': '7:30 AM',
    '8': '8:00 AM',
    '8.5': '8:30 AM',
    '9': '9:00 AM',
    '9.5': '9:30 AM',
    '10': '10:00 AM',
    '10.5': '10:30 AM',
    '11': '11:00 AM',
    '11.5': '11:30 AM',
    '12': '12:00 PM',
    '12.5': '12:30 PM',
    '13': '1:00 PM',
    '13.5': '1:30 PM',
    '14': '2:00 PM',
    '14.5': '2:30 PM',
    '15': '3:00 PM',
    '15.5': '3:30 PM',
    '16': '4:00 PM',
    '16.5': '4:30 PM',
    '17': '5:00 PM',
    '17.5': '5:30 PM',
    '18': '6:00 PM',
    '18.5': '6:30 PM',
    '19': '7:00 PM',
    '19.5': '7:30 PM',
    '20': '8:00 PM',
    '20.5': '8:30 PM',
    '21': '9:00 PM',
    '21.5': '9:30 PM',
    '22': '10:00 PM',
    '22.5': '10:30 PM',
    '23': '11:00 PM',
    '23.5': '11:30 PM',
}

export const timeListTranslation2 = [
    { time: '12:00 AM', value:'0.0' },
    { time: '12:30 AM', value:'0.5' },
    { time: '1:00 AM', value:'1.0' },
    { time: '1:30 AM', value:'1.5' },
    { time: '2:00 AM', value:'0.0' },
    { time: '2:30 AM', value:'0.5' },
    { time: '3:00 AM', value:'3.0' },
    { time: '3:30 AM', value:'3.5' },
    { time: '4:00 AM', value:'4.0' },
    { time: '4:30 AM', value:'4.5' },
    { time: '5:00 AM', value:'5.0' },
    { time: '5:30 AM', value:'5.5' },
    { time: '6:00 AM', value:'6.0' },
    { time: '6:30 AM', value:'6.5' },
    { time: '7:00 AM', value:'7.0' },
    { time: '7:30 AM', value:'7.5' },
    { time: '8:00 AM', value:'8.0' },
    { time: '8:30 AM', value:'8.5' },
    { time: '9:00 AM', value:'9.0' },
    { time: '9:30 AM', value:'9.5' },
    { time: '10:00 AM', value:'10.0' },
    { time: '10:30 AM', value:'10.5' },
    { time: '11:00 AM', value:'11.0' },
    { time: '11:30 AM', value:'11.5' },
    { time: '12:00 PM', value:'12.0' },
    { time: '12:30 PM', value:'12.5' },
    { time: '1:00 PM', value:'13.0' },
    { time: '1:30 PM', value:'13.5' },
    { time: '2:00 PM', value:'14.0' },
    { time: '2:30 PM', value:'14.5' },
    { time: '3:00 PM', value:'15.0' },
    { time: '3:30 PM', value:'15.5' },
    { time: '4:00 PM', value:'16.0' },
    { time: '4:30 PM', value:'16.5' },
    { time: '5:00 PM', value:'17.0' },
    { time: '5:30 PM', value:'15.5' },
    { time: '6:00 PM', value:'18.0' },
    { time: '6:30 PM', value:'18.5' },
    { time: '7:00 PM', value:'19.0' },
    { time: '7:30 PM', value:'19.5' },
    { time: '8:00 PM', value:'20.0' },
    { time: '8:30 PM', value:'20.5' },
    { time: '9:00 PM', value:'21.0' },
    { time: '9:30 PM', value:'21.5' },
    { time: '10:00 PM', value:'22.0' },
    { time: '10:30 PM', value:'22.5' },
    { time: '11:00 PM', value:'23.0' },
    { time: '11:30 PM', value:'23.5' },
];

export const agreementText = {
    title: 'Some Info',
    body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
    anim id est laborum.`
}

export const expertiseCommitmentText = {
    title: 'Expertise Commitement',
    body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
    anim id est laborum.`
}

export const consultationOutlineText = {
    title: 'Consultation Outline',
    body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
    anim id est laborum.`
}

export const DeclarationStatementText = {
    title: 'Declaration Statement',
    body: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
    anim id est laborum.`
}


/**
 * 
 change all clients and people to subscribers
 */

 export const timeZoneList = [
    {
        name: '+1 UTC',
        value: 1,
    },
    {
        name: 'GMT',
        value: 0,
    },
 ]