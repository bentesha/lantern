
module.exports = {
    main(){
        let options = [
            'Wauzaji Wapya',
            'Wauzaji',
            'Watumiaji Bidhaa'
        ];

        switch(this.input){
            case null:
            this.sendMenu(options);
            break;

            case '1':
            this.forward('new-vendor');
            break;

            case '2':
            this.forward('distributors/zones/select');
            break;

            case '3':
            this.forward('consumers/zones/select');
            break;

            default:
            this.sendMenu(options, 'Chaguo lako sio sahihi!');
            break;
        }
    }
}