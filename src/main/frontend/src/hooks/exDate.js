function extractDate(dateTimeString = "") {
    if(!dateTimeString){
      return ''
    }
   
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以需要加1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function extractDateTime(dateTimeString = "") {
  if (!dateTimeString) {
      return '';
  }
 
  const date = new Date(dateTimeString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以需要加1
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


// 自定义Hook：用于获取数据
export default function useExtractDate() {
  return { extractDate,extractDateTime };
}