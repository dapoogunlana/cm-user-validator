export const pricingPlanMapping = [
    {
        planName: 'On-demand',
        id: 0
    },
    {
        planName: 'Basic',
        id: 2
    },
    {
        planName: 'Standard',
        id: 3
    },
    {
        planName: 'Ultimate',
        id: 4
    },
];

export const routeConstants = {
    ADMIN: 'ADMIN',
    MARKETING: 'MARKETING',
    AUTH: 'AUTH',
    NFR: 'NFR',
    ADMINV1: 'ADMINV1',
    MARKETINGV1: 'MARKETINGV1',
    AUTHV1: 'AUTHV1',
    NFRV1: 'NFRV1',
    COACHV1: 'COACHV1',
    PAYMENT: 'PAYMENT',
};

export const imageExtensionList = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
];

export const videoExtensionList = [
    '.mp4',
    '.3gp',
    '.avi',
    '.mov',
    '.wmv',
];

export const timeConstants = [
    {
        name: '12 AM',
        value: '0',
    },
    {
        name: '1 AM',
        value: '1',
    },
    {
        name: '2 AM',
        value: '3',
    },
    {
        name: '3 AM',
        value: '3',
    },
    {
        name: '4 AM',
        value: '4',
    },
    {
        name: '5 AM',
        value: '5',
    },
    {
        name: '6 AM',
        value: '6',
    },
    {
        name: '7 AM',
        value: '7',
    },
    {
        name: '8 AM',
        value: '8',
    },
    {
        name: '9 AM',
        value: '9',
    },
    {
        name: '10 AM',
        value: '10',
    },
    {
        name: '11 AM',
        value: '11',
    },
    {
        name: '12 PM',
        value: '12',
    },
    {
        name: '1 PM',
        value: '13',
    },
    {
        name: '2 PM',
        value: '14',
    },
    {
        name: '3 PM',
        value: '15',
    },
    {
        name: '4 PM',
        value: '16',
    },
    {
        name: '5 PM',
        value: '17',
    },
    {
        name: '16 PM',
        value: '18',
    },
    {
        name: '7 PM',
        value: '19',
    },
    {
        name: '8 PM',
        value: '20',
    },
    {
        name: '9 PM',
        value: '21',
    },
    {
        name: '10 PM',
        value: '22',
    },
    {
        name: '11 PM',
        value: '23',
    },
];

export const descisionConstants = {
    pending: 0,
    successful: 1,
    failed: 2
};

export const regexConstants = {
    phonePattern: /^(0+(7|8|9)+(0|1)+\d{8})/,
    addressPattern: /^([a-zA-Z#,.\-\d\s])*$/,
    emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}