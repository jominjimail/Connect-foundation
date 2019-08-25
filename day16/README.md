# day16-challenge


## Text Browser

URI/URL 규격과 HTTP 프로토콜 규격을 이해하면 웹 브라우저가 동작하는 방식을 이해하는 데 도움이 된다. 실제로 웹 브라우저 주소창에 주소를 입력한 순간부터 웹 서버를 찾아서 요청을 보내고 응답을 받아서 화면에 표시하기까지 흐름을 이해하는 게 중요하다.

- URI/URL 표준 규격을 학습하고, URL 문자열을 분석해서 처리하는 라이브러리를 직접 구현하는 것이 목표다. 
- Node js 는 URL util 이 존재한다. 이를 참고해서 만든다.
- regular expression 할때 Group Matching을 사용하면 좋다.
- url 에서 꼭 필요한 요소가 무엇인지 생각해보자.
- Http request와 response의 구성 요소도 생각해보자.

### URL

정규 표현식을 사용했다. 

global, multi line 옵션을 적용했다. 이러면 group matching 을 할 수 있다. 그룹에 해당하는게 없다면 undefined 이다. 

참고 링크에 있는 프로그램을 사용했고 왼쪽에 보면 Code Generator 있다. 언어별로 사용가능하다.   

```javascript
const regex = /^(([^:\/?#]+:)?(\/\/((([^\/?#:]*)?(?:\:([^\/?#:]*))?\@)?([^\/?#:]*)(?::([^\/?#:]*))?)))(([^?]*)(?:\?([^#]*))?)/gm;
var matches = regex.exec(url);
```



참고 :

Node js URL : <https://nodejs.org/docs/latest/api/url.html>

Regular Expression Tool : <https://regex101.com/>



