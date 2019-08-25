function httpResponse(){
    this.data = '';
    this.head = '';
    this.body = '';
    this.body_length = 0;


    this.getData = (data) =>{
        const res_data = data.toString();
        const res = res_data.split("\r\n\r\n");

        this.head = res[0];
        this.body = res[1];
        //console.log(this.head);
        console.log(this.body);

        let head_arr = this.head.split("\r\n");
        //console.log(head_arr);
        let content_length = head_arr[4].split(':');
        //console.log(content_length);
        let body_len = Buffer.from(this.body).length;
        console.log(body_len, content_length[1].trim());
    }


    
}   

module.exports = httpResponse;