# ks-calendar

> Basic calendar API powered by [moment.js](https://momentjs.com/) for custom calendar UI made for JS Community. Feel free to contribute and innovate

---
# Installation

```bash
$ npm install ks-calendar --save
```

___

# Basic Usage

```javascript
let calendar = require('ks-calendar')

let currentMonth = calendar.load(new Date())

```

___

# Documentation

### Calendar Output

|Type| Description |
|--|
|`boolean`| returns *false* if date is invalid. |
|`array` | returns array of days if date is valid. |

### Week Object
> Array of weeks sorted from first week of the month to the last. The length will depend on the number of weeks in the month

|Object |Type| Description|
|---|
|**week**| `number` | Week of the year.|
|**days**| `array` | Array of moment object of the week starting from Sunday to Saturday.|

### Additional Methods
> Basic logical methods that can be used inside the module

| Method             | Description                               | Example |
|--------------------------------------------------------------------------|
|`nextMonth()`       | Loads next month                           | |
|`previousMonth()`   | Loads previous month                       | |
|`nextYear()`        | Loads next year starting from January      | |
|`previousYear()`    | Loads previous year starting from January  | |
|`jumpToMonth(month)`| Jumps to target month. **month** *<1-12>*  | `.jumpToMonth(4)` loads April |
|`jumpToYear(year, <month>)`  | Jumps to target year but you can pass additional parameter for target month. **year** <*YYYY / YY*> **month** *<1-12>*| `.jumpToYear(2006)` loads *January 2006* `.jumpToYear(2006, 5)` loads *May 2006* calendar|
