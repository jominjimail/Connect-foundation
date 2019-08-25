# day13-challenge
## 챌린지 day13 문제 해결 저장소

### 객체생성

- **Using Object literal** : 표현의 간결함 때문에 많이 사용된다.

- ```javascript
  var obj = { 
      name: 'minjijo', 
      age : 10, 
      increaseAge : function(i){
          this.age + i;
      } 
  };
  ```

  - 자바스크립트의 모든 object는 JSON으로 바꿀수 있다.

- **Using new Object() syntax**

  - ```javascript
    var human = new Object();
    human.key1 = "value1";
    human["key2"] = "value2";
    ```

  - 사실 리터널과 같은거다. 리터럴의 가독성이 더 좋아서 많이 사용할 뿐이다.

- **Object Constructor** : 자바스크립트는 class 대신 function을 사용한다. 

- ```javascript
  function Person(name) { 
      this.name = name; //인스턴스 각각 소유:인스턴스 멤버!
      this.setNewName = function(name){
          this.name = name;
      }
  }
  var exPerson = new Person('minji');
  ```

  - 일반 함수를 정의할때와 다름없다. 어떤 차이점이 있을까? 실질적으로는 동일하다. 어떤 역할로 사용될 지는 주변 실행 환경, 즉 연산자에 따라 달라진다. **new 와 함께 사용되면 메모리에 인스턴스를 생성하는 역할로 사용된다.** new 없이 단순히 () 연산자를 사용해 Person('minji')로 호출하면 일반 함수처럼 사용된다.

  - **암묵적인 약속** : 일반 함수는 소문자로 , 생성자는 대문자로!!

  - 생성자는 최초 생성되는 객체의 멤버 구조를 정의하고 그 값을 초기화하는 역할을 합니다.

  - ```javascript
    var mySon = new Person('jaehee'); 
    var mySon = new Person(); // 생성자 매개변수 name은 undefined로 설정됨 
    var mySon = new Person; // 생성자 매개변수 name은 undefined로 설정됨
    ```

  - **인스턴스 멤버 vs 프로토타입 멤버** : 프로토타입 멤버는 동일한 생성자로 생성되는 모든 객체(인스턴스)가 공유할 수 있는 멤버로써 자바에서 static느낌이다. 그 값이 변경되면 해당 생성자로 생성된 모든 객체에게 영항을 준다. 그에 반해 인스턴스 멤버의 변경은 해당 객체에만 영항을 줄 수 있다.

  - **자바스크립트는 프로토타입 멤버 중심이다.** 객체를 설계하거나 상속을 설계할 때 모두 **프로토타입 객체를 기준**으로 한다. 따라서 자바스크립트는 프로토타입 기반의 객체지향 언어라고 한다.

### 객체 메소드

- assign() : copy the values of all enumerable own **properties**

  - ```javascript
    let first = {name: 'Tony'};
    let last = {lastName: 'Stark'};
    let person = Object.assign(first, last);
    
    console.log(person) // {name: "Tony", lastName: "Stark"}
    console.log(first) // {name: "Tony", lastName: "Stark"}
    console.log(last) // {lastName: "Stark"}
    ```

  - ```javascript
    let obj = {person: 'Thor Odinson'};
    let clone = Object.assign({}, obj);
    console.log(obj) // {person: "Thor Odinson"}
    console.log(clone) // {person: "Thor Odinson"}
    ```



배열 메소드

- concat() : 주어진 배열/ 값들을 기존 배열에 합쳐서 새로운 배열을 반환

  - ```javascript
    var alpha = ['a', 'b', 'c'], numeric = [1, 2, 3];
    var alphaNumeric = alpha.concat(numeric);
    ```

- every() : 배열의 모든 요소가 함수로 구현된 테스트를 통과 하는지 확인 MDN참고

- filter() : 함수로 구현된 테스트를 통과한 요소들만 따로 빼 새로운 배열 생성

- find() : 함수 조건에 맞는 배열 안의 값 하나를 반환 

  - 최초발견된 값을 반환한다. 
  - 없다면 undefined를 반환한다.
  - 빈 배열은 동작하지 않는다. 
  - original array를 건들이지 않는다.



- 자바스크립트 배열과 객체의 이해
- 배열의 고차함수들 사용
- stack & queue 에 대한 개념을 익힌다.
- 재귀와 DFS와 같은 탐색방법
- *tokenizer, lexer, parser
- 정규표현식

