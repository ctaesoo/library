let myTable = [];

// - 불러오는 초기값
function setIntial() {
if(localStorage.length === 0) {
    const element = document.getElementById("booksTable");
    for(let i = 0; i <= 4; i++) {
        const newElement = document.createElement("tr");
        element.appendChild(newElement);
        newElement.innerHTML += `
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                `;
    }
  }
  for(let i = 1; i <= localStorage.length; i++) {
    const element = document.getElementById("booksTable");
    const newElement = document.createElement("tr");
    let tableContents_i = JSON.parse(localStorage.getItem(i));
    // 나중에 쓸 배열 만들기
    myTable.push(tableContents_i);
    element.appendChild(newElement);
    newElement.innerHTML = `
                            <tr id="tr_${i}";>
                            <td>${i}</td>
                            <td><a href="#" id='row_${i}' onclick='inputInfo(this.id);'>${tableContents_i.title}</a></td>
                            <td>${tableContents_i.content}</td>
                            <td>${tableContents_i.Author}</td>
                            <td>${tableContents_i.date}</td>
                            </tr>
                            `;
  }
  emptyBar();
}

setIntial();
// -를 불러주는 함수
    function emptyBar() {
        if(localStorage.length !== 0 && localStorage.length < 5) {
            for(let i = localStorage.length; 5 - i; i++) {
                const element = document.getElementById("booksTable");
                const newElement = document.createElement("tr");
                element.appendChild(newElement);
                newElement.innerHTML += `
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                `
            }
        }
      }
  // inputInfo   temp는 변환해주기 위해 임시로 key값을 저장하는 곳.
  let temp = [];
  function inputInfo(clicked_id) {
    for(let i = 0; i <= myTable.length - 1; i++) {
        if(myTable[i].title === document.getElementById(clicked_id).innerHTML) {
            document.querySelector('#putTitle').value = myTable[i].title;
            document.querySelector('#putAuthor').value = myTable[i].Author;
            document.querySelector('#bookDate').value = myTable[i].date;
            document.querySelector('#contents').value = myTable[i].content;
            temp.push(clicked_id.slice(4));
        }
    }
  }
  // input
  let id = 1;
  function input() {
    // 책 등록시 빈 값 필터
    if(document.getElementById("putTitle").value === "" 
    || document.getElementById("contents").value === ""
    || document.getElementById("putAuthor").value === ""
    || document.getElementById("bookDate").value === "") {
        alert("등록할 책의 제목, 저자, 출판일, 내용을 입력하세요.")
    } else {
    const element = document.getElementById("booksTable");
    const newElement = document.createElement("tr");
    if(id < localStorage.length) {
            id = localStorage.length;
            id += 1;
        }
    let title = document.getElementById("putTitle").value;
    let content = document.getElementById("contents").value;
    let Author = document.getElementById("putAuthor").value;
    let date = document.getElementById("bookDate").value;
    let book = {
        id: id,
        title: title,
        content: content,
        Author: Author,
        date: date,
    }

    // modify
    
    // 임시로 받은 local storage key 값이 있다면 그 키값에 따라 setItem으로 값을 바꿔준다.
    if(temp.length !== 0) {
        let title = document.getElementById("putTitle").value;
        let Author = document.getElementById("putAuthor").value;
        let date = document.getElementById("bookDate").value;
        let content = document.getElementById("contents").value;
        let book = {
            id: parseInt(temp[temp.length-1]),
            title: title,
            content: content,
            Author: Author,
            date: date,
        }
        localStorage.setItem(temp[temp.length-1], JSON.stringify(book));
        location.reload();
    }
    
    element.appendChild(newElement)
    localStorage.setItem(id, JSON.stringify(book));
    // HTML을 비우고 초기값 다시 실행;
    element.innerHTML = ``;
    // // 수정시 동시에 등록되는 마지막 값을 지워준다.
    if(temp.length !== 0) {
        localStorage.removeItem(localStorage.length);
    }
    setIntial();
    // 임시 key 값이므로 다시 뺀다.
    temp.pop();
    id++;
  }
}
  
  // date range 값을 모두 배열로 담는 함수
  function getDateRangeData(dateStart, dateEnd){  //dateStart은 시작일, dateEnd는 종료일이다.
  var res_day = [];
   var ss_day = new Date(dateStart);
     var ee_day = new Date(dateEnd);    	
      while(ss_day.getTime() <= ee_day.getTime()){
        var _mon_ = (ss_day.getMonth()+1);
        _mon_ = _mon_ < 10 ? '0'+_mon_ : _mon_;
        var _day_ = ss_day.getDate();
        _day_ = _day_ < 10 ? '0'+_day_ : _day_;
         res_day.push(ss_day.getFullYear() + '-' + _mon_ + '-' +  _day_);
         ss_day.setDate(ss_day.getDate() + 1);
     }
     return res_day;
  }
  
  // search
    function findOneBook(searchOption, dateStart, dateEnd) {
    const element = document.getElementById("booksTable");
    // element부모 비워주기
    if(searchOption === "" && dateStart === "" && dateEnd === "") {
        location.reload();
        // 검색창만 입력시
    } else if(searchOption && dateStart === "" && dateEnd === "") {
        element.innerHTML = `
                            `;
            for(let i = 1; i <= localStorage.length; i++) {
                let dateSplit = localStorage.getItem(i).split('');
                let dateSlice = dateSplit.splice(dateSplit.length - 12, 10).join('');
                if(localStorage.getItem(i).includes(searchOption) 
                || getDateRangeData(dateStart.toString(), dateEnd.toString()).includes(dateSlice)) {
                    let tableContents_i = JSON.parse(localStorage.getItem(i));
                    element.innerHTML +=  `
                                            <td>${i}</td>
                                            <td><a id='row_${i}' onclick='inputInfo(this.id);'>${tableContents_i.title}</a></td>
                                            <td>${tableContents_i.content}</td>
                                            <td>${tableContents_i.Author}</td>
                                            <td>${tableContents_i.date}</td>
                                            `;
            } else if(getDateRangeData(dateStart.toString(), dateEnd.toString()).includes(dateSlice)){
                location.reload();
            }
        };
        //날짜만 입력시
    } else if (searchOption === "" || dateStart && dateEnd){
        element.innerHTML = `
                            `;
            for(let i = 1; i <= localStorage.length; i++) {
                let dateSplit = localStorage.getItem(i).split('');
                let dateSlice = dateSplit.splice(dateSplit.length - 12, 10).join('');
                if(localStorage.getItem(i).includes(searchOption) 
                && getDateRangeData(dateStart.toString(), dateEnd.toString()).includes(dateSlice)) {
                    let tableContents_i = JSON.parse(localStorage.getItem(i));
                    element.innerHTML +=  `
                                            <td>${i}</td>
                                            <td><a id='row_${i}' onclick='inputInfo(this.id);'>${tableContents_i.title}</a></td>
                                            <td>${tableContents_i.content}</td>
                                            <td>${tableContents_i.Author}</td>
                                            <td>${tableContents_i.date}</td>
                                            `;
            } else if(getDateRangeData(dateStart.toString(), dateEnd.toString()).includes(dateSlice)){
                location.reload();
            }
        };
    }
  };