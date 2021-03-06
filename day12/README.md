# Day12 Canvas

## 왜 필요한가?
웹 브라우저를 비롯한 클라이언트 화면은 2차원 좌표시스템을 따르고 있다. 
2차원 좌표 시스템 상에 점, 선, 면, 텍스트, 이미지 등을 그리고 회전하고 이동하는 시스템에 대해 학습해야 자유롭게 표시할 수 있다.

## 학습 목표
- 2D 그래픽스와 캔버스에 대한 기초 지식에 대해 학습한다.
- 캔버스에 직접 점, 선, 면, 텍스트를 그리고, 회전하고 이동하는 변환 동작을 구현하는 것이 목표다.
- 색상 개념을 이해하고 Gradient로 색칠하도록 구현하는 것이 목표다.

## 미션

#### 1) Background 요구사항

<img src="http://public.codesquad.kr/jk/cs23/step19-1.canvas.png" width="500">

- 가로 600 x 세로 400 캔버스를 생성한다.

- 캔버스 배경 색상을 녹색으로 가득 색칠한다.

- 좌측 상단에 흰색 배경색으로 Circle을 그린다.

- 동일한 반지름 크기로 Pie를 그리고 내부만 검정색으로 색칠한다.

- 작은 반지름으로 눈 모양을 그린다.

- 지름과 같은 크기로 정사각형을 그리고 흰색으로 색칠한다.

- 아랫 부분은 검정색 굵은 직선으로 다리 부분을 그린다.

- 캔버스로 그린 것은 jpg 또는 png 이미지 파일로 저장한다.

#### 2) Text 요구사항

<img src="http://public.codesquad.kr/jk/cs23/step19-2.canvas.png" width="500">


- 앞 단계에서 입 부분 Pie 부분을 남색으로 변경한다.

- 몸통 부분은 Gradient로 두 가지 색을 사용해서 점진적으로 색칠한다.

- 아랫 부분 오른쪽 다리는 실선에서 점선으로 변경한다.

- 간단한 문자열을 원 앞에 그린다. 문자열 색상을 지정한다.

### 3) Transform 요구사항

<img src="http://public.codesquad.kr/jk/cs23/step19-3.canvas.png" width="500">

- 문자열을 문자열 중점을 기준으로 -330도 회전한다.

- 우측에 직선 7개를 연결해서 ⇨ 화살표 모양을 그린다. 내부는 회색으로 색칠한다.

- 화살표는 화살표 좌측 아래를 기준으로 30도 회전한다.

- 화살표 아래에는 유명한 미술작품 이미지를 좌측 정사각형 높이 혹은 너비와 같도록 이미지 비율을 맞춰서 그린다. 만약 세로 그림이면 좌우가 여백이 생기고, 가로 그림이면 위아래가 여백이 생긴다.

## 배경 지식

- 수학 2차원 직교 좌표시스템과 해당 그래픽 시스템 좌표시스템 차이에 대해 학습한다.

- 2차원 좌표시스템에서 점, 선, 도형, 텍스트, 이미지 등을 표시하는 방법을 학습한다.

- 2차원 좌표시스템에서 좌표를 translate, scale, rotate 하는 방법과 Affine Transform 으로 변환시키는 방법을 학습한다.

- 2D 그래픽스 그리기 동작을 위한 캔버스 관련 API에 대해 학습한다.

- Javascript + Web Canvas API 표준과 node 기반 구현 자료를 학습한다.
  

## 학습정리

### 피어 컴파일링 체크포인트

```
  1. [ ] 캔버스 배경색 색칠
  2. [ ] 얼굴 모양 - 원 그리기
  3. [ ] 입모양 - 원호 그리기
  4. [ ] 눈모양 - 원 그리기
  5. [ ] 몸통 - 사각형 + 그라데이션 색칠
  6. [ ] 다리 - 실선과 점선 그리기
  7. [ ] 말풍선 - 텍스트 및 rotate 회전
  8. [ ] 화살표 - closed path 그리기 및 회전
  9. [ ] 미술작품 - 이미지 비율에 맞춰 그리기
  10. [ ] 이미지 파일 저장 기능
```

### 스스로 확인할 사항

- CANVAS API 종류들에 대해 학습하고 정리한다.

### 다같이 확인할 사항

- SVG 개념에 대해 학습하고 CANVAS 2D API와 비교해서 정리한다.
- 다양한 이미지 파일 포맷에 대해 학습하고 정리한다.
