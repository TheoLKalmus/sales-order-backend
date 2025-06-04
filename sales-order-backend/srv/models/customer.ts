type CustomerProps = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export class CustomerModel {
    constructor(private props: CustomerProps) {}

    public static create(props: CustomerProps): CustomerModel {
        return new CustomerModel(props);
    }
    
    public get id() {
        return this.props.id;
    }
 
    public get firstName() {
        return this.props.id;
    }

    public get lastName() {
        return this.props.id;
    }

    public get email() {
        return this.props.id;
    }

    public setDefaultEmailDomain() {
        if(!this.props.email.includes('@')){
            this.props.email = `${this.props.email}@gmail.com`;
        }
    }

    public toObject(): CustomerProps {
        return {
            id: this.props.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email
        }
    }
}