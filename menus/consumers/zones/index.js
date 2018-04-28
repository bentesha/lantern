
module.exports = {
    main(){
        let options = [
            'Find retailer',
            'Identify counterfeit',
            'PICS recommended price'
        ];

        if(this.input === null){
            this.sendMenu(options, 'Welcome to PICS - ' + this.data.zone);
            return;
        }

        switch(this.input){
            case '1':
            this.send('Sorry! There are currently no retailers available in this zone! Please check us back soon!', true);
            break;

            case '2':
            this.send('Two heavy inner liner (bottom double seals) with outer printed PICS and KINGA NJAA. Thank you for using PICS.', true);
            break;

            case '3':
            this.send('Thank you for using PICS!\n5,000 is the recommended retail price!', true);
            break;

            default:
            this.sendMenu(options, 'You have entered an invalid option!', options);
            break;
        }
    }
}