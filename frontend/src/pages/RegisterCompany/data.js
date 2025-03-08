
 const data=[
    {
        Type:'text',
        Title:'Company Name', 
        Name:'c_name',
        ID: "name"
    },
    {
        Type:'text',
        Title:'CEO/Head Name', 
        Name:'h_name',
        ID: "hname"
    },
    {
        Type:'text',
        Title:'Website',
        Name:'website',
        ID:'website'
    },
    {
        Type:'email',
        Title:'Email',
        Name:'email',
        ID:'email'
    },
    {
        Type:'number',
        Title:'Phone',
        Name:'phone',
        ID:'phone',
        MaxLength: '11'
    },
    {
        Type:'file',
        Title:'Logo', 
        Name:'logo',
        ID: "logo",
        Variant: "inputVariantTwo"
    },  
    {
        Type:'Number',
        Title:'Organization size', 
        Name:'o_size',
        ID: "O_size"
    }
]
export default data;