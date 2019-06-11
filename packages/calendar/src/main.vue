<template>
  <div class='calendar-container'
       :class="{'pc-calendar':!isMobile}">
    <div class="change-month-area">
      <div class="pre-month"
           @click="changeMonth('pre')"></div>
      <div class="current-time"
           @click="changeMonth('cur')">{{fullYear}}年{{fullMonth+1}}月</div>
      <div class="next-month"
           @click="changeMonth('next')"></div>
    </div>
    <div class='main'>
      <ul class="weekend-list">
        <li v-for="(val,index) in weekend"
            :key="index">{{val}}</li>
      </ul>
      <ul class="day-list"
          @mouseout="handleOut"
          @mouseleave="handleOut">
        <li v-for="(item,index) in curMonth"
            :class="[{'is-selected': item.isSelected}, handleSelect(item)]"
            :key="index">
          <div class="outer">
            <div class="inner"
                 @click="handDateSelected(item)"
                 @mouseenter="handleOver(item)"
                 @mouseover="handleOver(item)"
                 @touchmove="handleOver(item)"
                 @touchend="handleOver(item)">
              <span :class="[{'is-current-month' : item.isCur,'is-selected' : item.isSelected}]">{{item.day}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  components: {},
  props: {
    language: {
      default: "cn"
    },
    canSelected: {
      type: Boolean,
      default: false
    },
    raws: {
      default: 5
    },
    rangeMonth: {
      default: 0
    },
    clean: {
      type: Boolean,
      default: false
    },
    dateType: {
      default: "YYYY-MM-DD"
    }
  },
  data() {
    return {
      monthDayList: [],
      fullYear: new Date().getFullYear(),
      fullMonth: new Date().getMonth(),
      monthDay: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      curDay: new Date().getDate(),
      curIsNow: null,
      isSelect: false,
      weekObj: {
        cn: ["日", "一", "二", "三", "四", "五", "六"],
        en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      },
      rangeSelect: {
        start: null,
        end: null
      },
      rangeStart: null,
      rangeEnd: null,
      saveCurItem: null,
      isMobile: false,
      isOn: true
    };
  },
  watch: {},
  computed: {
    dateTypes() {
      let dateType = this.dateType;
      let reg = /\w+([^a-zA-z0-9]+)/;
      let type = dateType.match(reg);
      return (type && type[1]) || "-";
    },
    curMonth() {
      return this.monthDayList[this.fullMonth].totalDay || [];
    },
    lang() {
      let reg = /(\?|)lang=(\w+)(&|)/;
      let arr = location.search.match(reg);
      let lang = arr && arr[2];
      lang && (lang = lang == "zh" ? "cn" : "en");
      let local = this.getCookie("lang");
      return (
        lang || local || (this.$i18n && this.$i18n.lcoale) || this.language
      );
    },
    weekend() {
      return this.weekObj[this.lang];
    },
    defYear() {
      return new Date().getFullYear();
    },
    defMonth() {
      return new Date().getMonth();
    },
    startSelected() {
      return this.rangeSelect["start"];
    },
    endSelected() {
      return this.rangeSelect["end"];
    },
    curMonthFirst() {
      let cur = this.curMonth.filter((item, index) => {
        return item["curMonth"] == this.fullMonth && item["day"] == 1;
      });
      return cur[0];
    },
    curMonthLast() {
      let cur = this.curMonth.filter((item, index) => {
        return (
          item["curMonth"] == this.fullMonth &&
          this.curMonth[index + 1] &&
          this.curMonth[index + 1].day == 1
        );
      });
      return cur[0];
    },
    rangeArr() {
      let start = this.startSelected;
      let end = this.endSelected;
      let arr = start ? [start] : [];
      if (start && end) {
        arr = [start, end];
        arr[0].curYear == arr[1].curYear
          ? arr[0].curMonth == arr[1].curMonth
            ? arr.sort((a, b) => a.day - b.day)
            : arr.sort((a, b) => a.curMonth - b.curMonth)
          : arr.sort((a, b) => a.curYear - b.curYear);
      }
      return arr;
    },
    startYear() {
      let start = this.rangeArr[0];
      return start && start.curYear;
    },
    endYear() {
      let end = this.rangeArr[1];
      return end && end.curYear;
    },
    startMonth() {
      let start = this.rangeArr[0];
      return start && start.curMonth;
    },
    endMonth() {
      let end = this.rangeArr[1];
      return end && end.curMonth;
    },
    startDay() {
      let start = this.rangeArr[0];
      return start && start.day;
    },
    endDay() {
      let end = this.rangeArr[1];
      return end && end.day;
    }
  },
  methods: {
    getCookie(val) {
      let reg = new RegExp(`($|)${val}=([^;]+)(;|$)`);
      let cookie = document.cookie;
      let arr = cookie.match(reg);
      return arr && arr[2];
    },
    handleSelect(item) {
      let arr = this.rangeArr;
      if (arr.length > 0) {
        switch (arr.length) {
          case 1:
            return item == arr[0] && "radius";
          default:
            let startYear = this.startYear;
            let endYear = this.endYear;
            let startMonth = this.startMonth;
            let endMonth = this.endMonth;
            let startDay = this.startDay;
            let endDay = this.endDay;
            let year = item.curYear;
            let month = item.curMonth;
            let day = item.day;
            let m1 = startMonth == month;
            let m2 = endMonth == month;
            let y1 = startYear == year;
            let y2 = endYear == year;
            if (y1 && y2) {
              return (item == arr[0] && item == arr[1]) ||
                (item.isSelected && !this.checkCurSelect(item))
                ? "radius"
                : month == startMonth && day == startDay
                ? "left"
                : month == endMonth && day == endDay
                ? "right"
                : "";
            } else {
              return y1 && m1 && day == startDay
                ? "left"
                : y2 && m2 && day == endDay
                ? "right"
                : item.isSelected && !this.checkCurSelect(item)
                ? "radius"
                : "";
            }
        }
      } else {
        return item.isSelected && "radius";
      }
    },
    checkIsMobile() {
      let ua = navigator.userAgent;
      let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
      let isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
      let isAndroid = ua.match(/(Android)\s+([\d.]+)/);
      this.isMobile = isIphone || isAndroid;
    },
    checkSelectRange(item) {
      item.isSelected = true;
      this.rangeSelect = {
        start: item,
        end: item
      };
      this.rangeStart = item;
      this.rangeEnd = null;
      this.selectDate([item]);
      this.selectMore();
    },
    handDateSelected(item) {
      if (!this.canSelected) return;
      if (this.rangeStart && this.rangeEnd) {
        this.checkSelectRange(item);
        return;
      }
      let endDay = this.endSelected && this.endSelected.day; // 记录鼠标最后滑过的日期或者是滑到非当前月份
      if (item.day == endDay || item.day == this.curDay) {
        item.isSelected = true;
      } else {
        item.isSelected = !this.startSelected ? true : !item.isSelected;
      }
      if (item.isSelected) {
        if (!this.rangeSelect["start"]) {
          this.rangeSelect["start"] = this.rangeStart = item;
          this.curIsNow.isSelected = false;
        } else {
          let total = parseInt(this.rangeMonth);
          let startYear = parseInt(this.startYear);
          let startMonth = parseInt(this.startMonth);
          let endYear = parseInt(item.curYear);
          let endMonth = parseInt(item.curMonth);
          let month = 0;
          if (startYear == endYear) {
            month = Math.abs(startMonth - endMonth);
          } else if (startYear > endYear) {
            month = 11 - endMonth + startMonth;
          } else {
            month = 11 - startMonth + endMonth;
          }
          if (total && total > 0 && month > total) {
            // console.log("--out of max--", total, month);
            this.$emit("handleMax", { num: month });
            return;
          }
          this.rangeSelect["end"] = this.rangeEnd = item;
        }
      }
      this.selectDate(this.rangeArr);
    },
    selectDate(rangeArr) {
      let type = this.dateTypes;
      let dataArr = rangeArr.map(item => {
        let time = [item.curYear, item.curMonth, item.day];
        return time.join(type);
      });
      this.$emit("handleSelect", dataArr);
    },
    checkCurSelect(item) {
      let startYear = this.startYear; // 选中的开始年份
      let endYear = this.endYear; // 选中的结束年份
      let startMonth = this.startMonth; // 选中的开始月份
      let endMonth = this.endMonth; // 选中的结束月份
      let startDay = this.startDay; // 选中的开始日期（天）
      let endDay = this.endDay; // 选中的结束日期（天）
      let month = item.curMonth; // 鼠标滑过的当前月
      let year = item.curYear;
      let day = item.day; // 鼠标滑过的当前日期（天）
      let innerDay = startDay <= day && endDay >= day; // 鼠标滑过的日期正好在选中的日期之间
      let m1 = startMonth == month; // 判断鼠标hover的日期正好是选中的开始的月份
      let m2 = endMonth == month; // 判断鼠标hover的日期正好是选中的结束的月份
      let y1 = startYear == year; // 判断鼠标hover的日期是否正好在开始的年份中
      let y2 = endYear == year; // 判断鼠标hover的日期是否正好在结束的年份中
      if (y1 && y2) {
        return (
          (m1 && m2 && innerDay) || // hover的日期正好是选中的日期
          (month > startMonth && month < endMonth) || // 选中的日期区间最少跨过三个月，并且hover的日期在两个日期之间并且月份不同
          (m1 && month < endMonth && day >= startDay) || // hover的日期在选中的开始月份上
          (m2 && month > startMonth && day <= endDay) // hover的日期在选中的结束月份上
        );
      } else {
        return (
          (y1 && ((m1 && day >= startDay) || month > startMonth)) ||
          (y2 && ((m2 && day <= endDay) || month < endMonth)) ||
          (year > startYear && year < endYear)
        );
      }
    },
    handleOver(item, type) {
      // 需要处理选中的日期跨年情况
      if (!this.canSelected) return;
      if (!this.startSelected || (this.rangeStart && this.rangeEnd)) {
        item.isSelected = true;
        this.saveCurItem = item;
        return;
      }
      this.rangeSelect["end"] = item;
      this.selectMore();
    },
    handleOut() {
      if (!this.rangeStart) {
        this.saveCurItem && (this.saveCurItem.isSelected = false);
        this.curIsNow && (this.curIsNow.isSelected = true);
      }
      this.rangeSelect["start"] = this.rangeStart;
      // 此处需注意，当没有获取范围时，this.rangeEnd是无法获取的为null，导致调用selectMore中渲染时报错
      this.rangeSelect["end"] = this.rangeEnd
        ? this.endSelected
        : this.rangeStart;
      this.selectMore();
    },
    selectMore() {
      let start = this.startSelected;
      let end = this.endSelected;
      if (start && end) {
        let arr = [start, end];
        let startM = start.curMonth;
        let endM = end.curMonth;
        let startY = start.curYear;
        let endY = end.curYear;
        let type = "day";
        if (startY != endY) {
          arr.sort((a, b) => a.curYear - b.curYear);
          type = "year";
        } else if (startM != endM) {
          arr.sort((a, b) => a.curMonth - b.curMonth);
          type = "month";
        } else {
          arr.sort((a, b) => a.day - b.day);
        }
        this.curMonth.forEach(item => {
          switch (type) {
            case "day":
              if (
                item.day >= arr[0].day &&
                item.day <= arr[1].day &&
                item.curMonth == startM
              ) {
                item.isSelected = true;
              } else {
                item.isSelected = false;
              }
              break;
            case "month":
              if (
                (item.curMonth == arr[0].curMonth && item.day >= arr[0].day) ||
                (item.curMonth == arr[1].curMonth && item.day <= arr[1].day) ||
                (item.curMonth > arr[0].curMonth &&
                  item.curMonth < arr[1].curMonth)
              ) {
                item.isSelected = true;
              } else {
                item.isSelected = false;
              }
              break;
            default:
              if (item.curYear == arr[0].curYear) {
                if (
                  (item.curMonth == arr[0].curMonth &&
                    item.day >= arr[0].day) ||
                  item.curMonth > arr[0].curMonth
                ) {
                  item.isSelected = true;
                } else {
                  item.isSelected = false;
                }
              } else if (item.curYear == arr[1].curYear) {
                if (
                  (item.curMonth == arr[1].curMonth &&
                    item.day <= arr[1].day) ||
                  item.curMonth < arr[1].curMonth
                ) {
                  item.isSelected = true;
                } else {
                  item.isSelected = false;
                }
              } else if (
                item.curYear > arr[0].curYear &&
                item.curYear < arr[1].curYear
              ) {
                item.isSelected = true;
              } else {
                item.isSelected = false;
              }
          }
        });
      }
    },
    initMonthDataList() {
      // 闰年是能被4整除但不能被100整除（被400整除除外）
      // 具体原因是，正常一年有365.2423天，每年会多出0.2423天，
      // 每4年会多0.9692天，接近1天，所以每四年多一天，正常情况400年的话多出96.92天，如果只是被4整除的话400年会有100个闰年
      // 也就是多出来100天，跟实际算出来的多了3天，所以规定不能被100整除的算闰年，按这种算法400/100=4,又比真实算出来的多了一天
      // 最终规定如果能被400整除算闰年
      let befMonth = [].concat(this.monthDay);
      befMonth.unshift(befMonth.pop());
      if (
        (this.fullYear % 4 == 0 && this.fullYear % 100 != 0) ||
        this.fullYear % 400 == 0
      ) {
        this.monthDay[1] = 29;
      }
      let checkDay = [];
      this.monthDay.forEach((val, index) => {
        // let day = new Date(year, month, day);// 获取每个月第一天是周几
        let day = new Date(this.fullYear, index, 1).getDay();
        let totalDay = [];
        let isSelected = false;

        let need = val + day;
        let raw = parseInt(this.raws);
        raw = raw >= 5 ? raw : 5;
        let num = raw || Math.ceil(need / 7); // 计算需要显示几行；
        let total = 7 * num - val; // 7 * num，显示num行七列
        let perMonth = 7 * num - day;
        perMonth = perMonth >= val ? val : perMonth;
        for (let i = 1; i <= perMonth; i++) {
          isSelected =
            this.fullYear == this.defYear &&
            this.fullMonth == index &&
            this.curDay == i;
          let obj = {
            isCur: true,
            curYear: this.fullYear,
            curMonth: index,
            day: i,
            preSelected: isSelected, // 新增月份日期多选，未实现
            isSelected // 选中当前日期
          };
          totalDay.push(obj);
          isSelected && (this.curIsNow = obj); // 存储当前日期
        }
        checkDay.push({
          curMonth: index,
          bef: day, // 上个月在当月1号之前显示几天
          after: total - day, // 下个月在当月最后一天之后显示几天
          totalDay
        });
      });
      checkDay.forEach((el, index) => {
        let befDay = el.bef;
        let aftDay = el.after;
        let preDate = befMonth[index];
        let curMonth = el.curMonth;
        let befM = curMonth > 0 ? curMonth - 1 : 11;
        let aftM = curMonth < 11 ? curMonth + 1 : 0;
        let beforeY = curMonth == 0 ? this.fullYear - 1 : this.fullYear;
        let afterY = curMonth == 11 ? this.fullYear + 1 : this.fullYear;
        let pre = preDate - befDay;
        for (; preDate > pre; preDate--) {
          el.totalDay.unshift({
            day: preDate,
            curMonth: befM,
            curYear: beforeY,
            isCur: false,
            preSelected: false,
            isSelected: false
          });
        }
        for (let i = 1; i <= aftDay; i++) {
          el.totalDay.push({
            day: i,
            curMonth: aftM,
            curYear: afterY,
            isCur: false,
            preSelected: false,
            isSelected: false
          });
        }
      });
      this.monthDayList = checkDay;
    },
    changeMonth(type) {
      switch (type) {
        case "pre":
          if (this.fullMonth - 1 < 0) {
            this.fullMonth = 11;
            this.fullYear--;
            this.initMonthDataList();
          } else {
            this.fullMonth--;
          }
          break;
        case "next":
          if (this.fullMonth + 1 > 11) {
            this.fullMonth = 0;
            this.fullYear++;
            this.initMonthDataList();
          } else {
            this.fullMonth++;
          }
          break;
        default:
          // 清除已选中的日期
          if (this.clean) {
            this.rangeStart = null;
            this.rangeEnd = null;
            this.rangeSelect = {
              start: null,
              end: null
            };
          }
          this.fullYear = this.defYear;
          this.fullMonth = this.defMonth;
          this.initMonthDataList();
      }
      this.selectMore();
    },
    clearResize() {
      if (window.removeEventListener) {
        window.removeEventListener("resize", this.handleResize);
      } else if (window.detachEvent) {
        window.detachEvent("resize", this.handleResize);
      } else {
        window.onresize = null;
      }
    },
    handleResize() {
      this.checkIsMobile();
      if (window.addEventListener) {
        window.addEventListener("resize", this.checkIsMobile);
      } else if (window.attachEvent) {
        window.attachEvent("resize", this.checkIsMobile);
      } else {
        window.onresize = this.checkIsMobile;
      }
    }
  },
  created() {
    this.handleResize();
    this.initMonthDataList();
  },
  mounted() {},
  activated() {},
  deactivated() {
    this.clearResize();
    console.log("--deactived--");
  },
  beforeDestroy(vm) {
    console.log("--beforeDestroy--", vm);
  },
  destroyed(vm) {
    console.log("--destroyed--", vm);
  }
};
</script>

<style lang='scss' scoped>
$icon_left: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyICg2Njg2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+amlhbnRvdV96dW88L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iamlhbnRvdV96dW8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJqaWFudG91X3NoYW5nIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjYyNDk3NjE4LDcuODU2MDkxNDMgTDkuODUyNjI0NzQsMy4xNjA4MTIwMyBDMTAuMDI1ODUxNiwyLjk2ODQyNDEyIDEwLjMyMjI0MDksMi45NTI4OTEwMSAxMC41MTQ2Mjg4LDMuMTI2MTE3ODcgQzEwLjcwNzAxNjgsMy4yOTkzNDQ3MyAxMC43MjI1NDk5LDMuNTk1NzM0MDYgMTAuNTQ5MzIzLDMuNzg4MTIxOTggTDUuOTkxMDc3NjMsOC44NTA1NjYzNSBDNS44OTQyODY1Myw4Ljk1ODA2Mzc1IDUuNzU5MDQzNDYsOS4wMTAzNDYxMyA1LjYyNDk3NjE4LDkuMDA1MzM2NjkgQzUuNDkwOTA4OTEsOS4wMTAzNDYxMyA1LjM1NTY2NTgzLDguOTU4MDYzNzUgNS4yNTg4NzQ3NCw4Ljg1MDU2NjM1IEwwLjcwMDYyOTM1MywzLjc4ODEyMTk4IEMwLjUyNzQwMjQ5NiwzLjU5NTczNDA2IDAuNTQyOTM1NjAyLDMuMjk5MzQ0NzMgMC43MzUzMjM1MTgsMy4xMjYxMTc4NyBDMC45Mjc3MTE0MzQsMi45NTI4OTEwMSAxLjIyNDEwMDc3LDIuOTY4NDI0MTIgMS4zOTczMjc2MywzLjE2MDgxMjAzIEw1LjYyNDk3NjE4LDcuODU2MDkxNDMgWiIgaWQ9ImRvd24iIGZpbGwtb3BhY2l0eT0iMC40NSIgZmlsbD0iIzAwMDAwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS42MjQ5NzYsIDYuMDA1Njg5KSByb3RhdGUoOTAuMDAwMDAwKSB0cmFuc2xhdGUoLTUuNjI0OTc2LCAtNi4wMDU2ODkpICI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=";
$icon_right: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyICg2Njg2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+amlhbnRvdV95b3U8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iamlhbnRvdV95b3UiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA2LjAwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNi4wMDAwMDAsIC02LjAwMDAwMCkgIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIj48L3JlY3Q+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik01LjYyNDk3NjE4LDcuODU2MDkxNDMgTDkuODUyNjI0NzQsMy4xNjA4MTIwMyBDMTAuMDI1ODUxNiwyLjk2ODQyNDEyIDEwLjMyMjI0MDksMi45NTI4OTEwMSAxMC41MTQ2Mjg4LDMuMTI2MTE3ODcgQzEwLjcwNzAxNjgsMy4yOTkzNDQ3MyAxMC43MjI1NDk5LDMuNTk1NzM0MDYgMTAuNTQ5MzIzLDMuNzg4MTIxOTggTDUuOTkxMDc3NjMsOC44NTA1NjYzNSBDNS44OTQyODY1Myw4Ljk1ODA2Mzc1IDUuNzU5MDQzNDYsOS4wMTAzNDYxMyA1LjYyNDk3NjE4LDkuMDA1MzM2NjkgQzUuNDkwOTA4OTEsOS4wMTAzNDYxMyA1LjM1NTY2NTgzLDguOTU4MDYzNzUgNS4yNTg4NzQ3NCw4Ljg1MDU2NjM1IEwwLjcwMDYyOTM1MywzLjc4ODEyMTk4IEMwLjUyNzQwMjQ5NiwzLjU5NTczNDA2IDAuNTQyOTM1NjAyLDMuMjk5MzQ0NzMgMC43MzUzMjM1MTgsMy4xMjYxMTc4NyBDMC45Mjc3MTE0MzQsMi45NTI4OTEwMSAxLjIyNDEwMDc3LDIuOTY4NDI0MTIgMS4zOTczMjc2MywzLjE2MDgxMjAzIEw1LjYyNDk3NjE4LDcuODU2MDkxNDMgWiIgaWQ9ImRvd24iIGZpbGwtb3BhY2l0eT0iMC40NSIgZmlsbD0iIzAwMDAwMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS42MjQ5NzYsIDYuMDA1Njg5KSByb3RhdGUoOTAuMDAwMDAwKSB0cmFuc2xhdGUoLTUuNjI0OTc2LCAtNi4wMDU2ODkpICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
.calendar-container {
  .current-time {
    text-align: center;
    font-size: rem(36);
    cursor: pointer;
  }
  .change-month-area {
    display: flex;
    padding: rem(20) rem(36);
    justify-content: space-between;
    align-items: center;
    div {
      font-size: rem(20);
      padding: rem(20);
      border-radius: rem(12);
      // background-color: rgb(38, 211, 38);
      text-align: center;
      color: #999;
      cursor: pointer;
      font-weight: 500;
      &.cur-month {
        margin: 0 rem(20);
      }
      &.pre-month,
      &.next-month {
        width: rem(56);
        height: rem(56);
      }
      &.pre-month {
        @include Background($icon_left);
        background-size: cover;
      }
      &.next-month {
        @include Background($icon_right);
        background-size: cover;
      }
    }
  }
  .main {
    width: 100%;
    ul {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: 0 rem(30);
      padding: rem(20);
      background: #999999;
      &.weekend-list {
        border-top: {
          left-radius: rem(8);
          right-radius: rem(8);
        }
      }
      &.day-list {
        border-bottom: {
          left-radius: rem(8);
          right-radius: rem(8);
        }
        li {
          cursor: pointer;
        }
      }
      li {
        width: 14%;
        font-size: rem(32);
        text-align: center;
        color: #fff;
        margin-top: rem(10);
        .outer {
          width: 100%;
          padding-top: 90%;
          position: relative;
          .inner {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            padding: rem(6);
            display: flex;
            span {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              opacity: 0.3;
              border-radius: 50%;
              &.is-current-month {
                opacity: 1;
                color: #fff;
              }
              transition: all 0.2s;
              // &.is-selected {
              //   border: 1px solid #999;
              //   background: #666;
              //   font-weight: bold;
              // }
            }
          }
        }
        &.is-selected {
          background: #666;
          .inner {
            span {
              font-weight: bold;
            }
          }
        }
        &.left {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }
        &.right {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        &.radius {
          border-radius: 6px;
        }
      }
    }
  }
}
.pc-calendar {
  // width: 360px;
  font-size: 10px;
  .current-time {
    font-size: 1.4em;
  }
  .change-month-area {
    padding: 1em 3em;
    div {
      padding: 0.6em;
      font-size: 1.4em;
      border-radius: 0.6em;
      &.cur-month {
        margin: 0 1em;
      }
    }
  }
  .main {
    ul {
      margin: 0 3em;
      padding: 1.6em;
      padding-bottom: 0;
      &.weekend-list {
        border-top: {
          left-radius: 0.8em;
          right-radius: 0.8em;
        }
      }
      &.day-list {
        border-bottom: {
          left-radius: 0.8em;
          right-radius: 0.8em;
        }
      }
      li {
        font-size: 1.2em;
        .outer {
          .inner {
            padding: 0;
          }
        }
      }
    }
  }
}
$typeList: scale rotate;
$transformList: scale(0) rotateY(360deg);
@each $type in $typeList {
  .#{$type}-fade-enter-active,
  .#{$type}-fade-leave-active {
    transition: all 0.5s linear;
  }
  $index: index($typeList, $type);
  .#{$type}-fade-enter,
  .#{$type}-fade-leave-to {
    opacity: 0;
    transform: #{nth($list: $transformList, $n: $index)};
  }
}
</style>
