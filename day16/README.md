# day16-challenge


## Text Browser

URI/URL 규격과 HTTP 프로토콜 규격을 이해하면 웹 브라우저가 동작하는 방식을 이해하는 데 도움이 된다. 실제로 웹 브라우저 주소창에 주소를 입력한 순간부터 웹 서버를 찾아서 요청을 보내고 응답을 받아서 화면에 표시하기까지 흐름을 이해하는 게 중요하다.

- URI/URL 표준 규격을 학습하고, URL 문자열을 분석해서 처리하는 라이브러리를 직접 구현하는 것이 목표다. 
- Node js 는 URL util 이 존재한다. 이를 참고해서 만든다.
- regular expression 할때 Group Matching을 사용하면 좋다.
- url 에서 꼭 필요한 요소가 무엇인지 생각해보자.
- Http request와 response의 구성 요소도 생각해보자.



### URL.js

- url 을 파싱하기 위해 정규 표현식을 사용했다. 테스트를 위해 main.js 을 실행하면 된다. url 파싱중 유효하지 않은 토큰이 있다면 throw 처리했다.

- global, multi line 옵션을 적용했다. 이러면 group matching 을 할 수 있다. 그룹에 해당하는게 없다면 undefined 이다. 

- 참고 링크에 있는 프로그램을 사용했고 왼쪽에 보면 Code Generator 있다. 언어별로 사용가능하다.

- ```javascript
  const regex = /^(([^:\/?#]+:)?(\/\/((([^\/?#:]*)?(?:\:([^\/?#:]*))?\@)?([^\/?#:]*)(?::([^\/?#:]*))?)))(([^?]*)(?:\?([^#]*))?)/gm;
  var matches = regex.exec(url);
  ```
  - url 을 파싱할때 정규표현식을 사용하면 if, else 문의 지옥에서 벗어날수 있다. 간편하게 특수문자의 유무도 판단할 수 있고 '?' 연산자를 이용해 있을수도 있고 없을수도 있는 url 요소들를 간단하게 체크할수 있다.

- #### URL 구성 요소

  - protocol(http:) : 웹 브라우저가 서버와 내용을 주고받을 때 사용할 규칙 이름이다. 보통 google.com 만 입력해도 잘 된다. 이때는 브라우저가 알아서 `http://`를 넣어줘서 잘되는 것이다. 

  - auth : 이름과 비밀번호는 생략할수있다. 만약 값이 없다면 서버가 디폴트값을 할당해주기도 한다.

  - host : 서버의 이름과 포트정보를 입력한다. hostname은 필수사항이고 서버마다 `http`라면 디폴트로 포트번호 `80`을 할당해주기도 한다.

  - path : 해당 서버에서 필요한 자원의 위치를 지정하는 pathname와 query가 있다. 자원의 위치를 지정하지 않고 [www.zum.com을](http://www.zum.xn--com-of0o/) 입력할 경우 디폴트로 `/` 루트 경로로 알아듣는다. 경로와 query 의 구분자로는 `?` 문자를 사용한다. 있을수도 있고 없을수도 있기 때문이다. 

  - password 와 query, port 를 깔끔하게 뜨기 위해 `(?:x)` 표현을 사용했다. 어려운 표현이다. 다시 생각해보니 사용안해도 된다. 그냥 이런게 있다고 알자.

    - 'x'에 일치하지만 일치한 것을 기억하지 않습니다. *괄호는 비포획 괄호(non-capturing parentheses)라고 합니다.* 
    - /abc+/는 "abcabcabc"에 "abc"가 매칭됩니다. ('ab' 뒤에 오는 'c'의 1번 이상 반복되는 문자열을 매칭합니다.)
    - abc가 반복되는 것을 매칭하고 싶을 때 (?:x) 패턴을 사용할 수 있습니다.
    - /(?:abc)+/는 "abcabcabc"에 "abcabcabc"가 매칭됩니다. (abc 전체를 + 패턴으로 매칭하게 됩니다.)

    

### HttpRequest.js

- CRLF : The term CRLF refers to **C**arriage **R**eturn (ASCII 13, \r) **L**ine **F**eed (ASCII 10, \n). They're used to note the termination of a line, however, dealt with differently in today’s popular Operating Systems. For example: in Windows both a CR and LF are required to note the end of a line, whereas in Linux/UNIX a LF is only required. In the HTTP protocol, the CR-LF sequence is always used to terminate a line.

- 우리는 CRLF로 `\r\n\r\n`을 사용한다. 헤더와 바디를 구분할 수 있는 아주 중요한 키워드이다. 

- ```javascript
  const CRLF = '\r\n\r\n';
  ```

- HttpRequest객체는 host와 method 정보를 이용해 서버에 보낼 request message를 작성한다. 

- ```javascript
  get msg(){
          return `${this.method} / HTTP/1.1\r\nAccept: text/html\r\nHost: ${this.host}\r\nUser-Agent: Mozilla/5.0${CRLF}`;
  }
  ```



### HttpResponse.js

- 서버가 보내준 데이터를 받는 객체이다. socket의 `on` 이벤트로 대용량의  데이터를 적당한 크기로 나눠 여러번 받아 배열에 차곡차곡 쌓아준다. 데이터를 모두 다 받았으면 socket의 `end` 이벤트를 이용해 여태까지 받은 버퍼 데이터를 concat 함수를 사용해 하나로 연결해 HttpResponse객체로 넘겨준다.

- 넘겨받은 데이터를 string 타입으로 변경하고 `\r\n\r\n`로 헤더와 바디를 나눈다. 

- ```javascript
  // client.js
  socket.on('data', (data) =>{  
      temp_buffer.push(data);
  })
  socket.on('end', ()=>{
      response.getData(Buffer.concat(temp_buffer));
  })
  
  // HttpResponse.js
  HttpResponse.prototype.getData = function(data){
      this.data = data.toString();
      const temp_data = this.data.split(CRLF);
      this.head = temp_data[0];
      this.body = temp_data[1];
      ...
  }   
  ```

  

참고 :

Node js URL : <https://nodejs.org/docs/latest/api/url.html>

Regular Expression Tool : <https://regex101.com/>

Reqular Expression : https://beomy.tistory.com/21

CRLF Injection : <https://www.owasp.org/index.php/CRLF_Injection>