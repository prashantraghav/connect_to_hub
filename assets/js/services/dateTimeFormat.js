//accepted dateTimeFormat = '2015-06-11 04:07:00'

cth.service('dateTimeFormat', ['$filter', function($filter){
  var date = function(dateTime){
    var today = new Date();
    var dt = new Date(dateTime)
    if (dt.getDate() == today.getDate())
      date = 'Today';
    else if (dt.getDate() == (today.getDate() - 1))
      date = 'Yesterday';
    else
      date = $filter('date')(dt, 'd-MMM');

    return date;
  }


  var time = function(dateTime){
    var dt = new Date(dateTime)
    time = $filter('date')(dt, 'h:mm a');
    return time;
  }

  return{
    date: date,
    time: time
  }
}]);
