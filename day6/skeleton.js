//todo list의 기능

/*
JSON data 포멧 형식 : 

[
    { "todo" : [
        {"id" : 123 , values : ['a', 'b'] , des : "자바 공부하기" },
        {"id" : 124 , values : ['s', 'f'] , des : "ios 공부하기" } ]},
    { "doing" : [
        {"id" : 155 , values : ['a', 'b'] , des : "자바2 공부하기" },
        {"id" : 167 , values : ['s', 'f'] , des : "ios2 공부하기" } ]},
    {"done" : [
        {}
    ]}
]
*/

/*
명령어 분석기
main_order$$[...etc]

show $$ (current || todo || doing || done);

add $$ des $$ values

update $$ id $$ states

delete $$ id


*/

/* 
1. todo list 보여주기
- 현재 상태 [모두] 보여주기 : data의 todo, doing, done 각각의 id 번호을 모두 보여준다. 
    show_all();

    출력 형태 : 
        현재상태 :  todo:[123,124], doing:[123,444], done:[]
    
    1. string ans가 있다.
    2. ["todo", "dogin", "done"] 3번 반복한다. 
    3. 매순간 "todo:" 을 더하고, 새로운 arr []를 만들어준다. => ? 새로운 arr를 만들지 않고 즉시 출력한다.
    4. "todo"의 value의 length 만큼 reduce 로 id 값을 쌓아 id_arr를 만든다.
    5. `$arr`를 string 에 추가한다 => 즉시 출력한다.
        
- 특정 상태 디테일하게 보여주기 : 넘겨받은 state 의 값에 따라 des, id 번호를 보여준다. 
    - show_detail(state);
        - state == todo 상태 보여주기 : data의 todo 총 개수와 각각의 des, id 번호를 보여준다. 
        - state == doing 상태 보여주기 : data의 dogin 총 개수와 각각의 des, id 번호를 보여준다.
        - state == done 상태 보여주기 : data의 done 총 개수와 각각의 des, id 번호를 보여준다.
    
    출력 형태 :
        todo리스트 :  총2건 : ' 자바스크립트 공부하기, 123번','iOS공부하기, 124번'

*/

/*
2. todo list 추가하기
- 특정 번호의 할 일 [todo] 상태 배열에 추가하기 : 입력받은 des와 value 값을 data의 todo에 추가해준다. 
    add(des, value);

    출력 형태 : 
        docker공부하기가 추가됐습니다.(id : 7788)
        현재상태 :  todo:[123,124,7788], doing:[123,444], done:[]

    1. 명령어가 add로 시작하면, 
    2. unique 한 id를 할당받는다.
    3. {id, values, des} object를 만든다.
    4. object를 todo 에 추가한다.
    5. // JSON 파일을 다시 쓸수 있을까?????
*/

/*
3. todo list 업데이트하기
- 특정 번호의 할 일 상태 변경하기 : 입력받은 id 값과 일치하는 상태를 찾고 입력받은 상태에 추가해준다. 
    update(id, state);

    출력 형태 : 
        docker공부하기 doing으로 상태가 변경됐습니다
        현재상태 :  todo:[123,124], doing:[123,444, 7788], done:[]

    1. 입력받은 id를 찾는다. 
    2-1. now_state 가 존재하면, 입력받은 state 와 비교를 한다. 
        3-1. 같다면, 변경사항이 없다고 출력해준다.
        3-2. 다르다면, copy 했던 object를 입력받은 state 배열에 추가한다. ?add??
    2-2. id가 존재하지 않는다면, 없다고 출력해준다.
*/

/*
4. todo list 삭제하기
- 특정 번호의 할 일 삭제하기 : 입력받은 id 값과 일치하는 상태를 찾아 삭제한다. 
    delete(id);

    1. 입력받은 id를 찾는다.
    2-1. now_state가 존재하면, 
        3. now_state의 배열을 filter를 거쳐 새로 만들어 재 정의해준다.
    2-2. now_state가 존재하지 않는다면, 업다고 출력해준다.
*/
