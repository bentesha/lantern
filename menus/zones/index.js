
module.exports = {
    main(){
        let options = [
            'Find distributor contacts',
            'Report counterfeit',
            'Confirm PICS recommended price'
        ];

        if(this.input === null){
            this.sendMenu(options, 'Welcome to PICS - ' + this.data.zone);
            return;
        }

        switch(this.input){
            case '1':
            this.send('There are currently no distributors registered for this zone! Please check us back soon!', true);
            break;

            case '2':
            this.send('Thank you for using PICS! Our assistant will call you shortly on this number!', true);
            break;

            case '3':
            this.send('Thank you for using PICS! 5,000 is the recommended retail price!', true);
            break;

            default:
            this.sendMenu(options, 'You have entered an invalid option!', options);
            break;
        }
    }
}