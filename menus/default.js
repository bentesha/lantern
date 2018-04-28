
module.exports = {
    main(){
        let options = [
            'New Vendor',
            'Vendor',
            'Consumer'
        ];

        switch(this.input){
            case null:
            this.sendMenu(options);
            break;

            case '1':
            this.foward('new-vendor');
            break;

            case '2':
            this.forward('distributors/zones/select');
            break;

            case '3':
            this.forward('consumer');
            break;

            default:
            this.sendMenu(options, 'You have entered an invalid option!');
            break;
        }
    }
}