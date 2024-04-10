function accordionFunctions(obj) {
  'use strict';
  const accordion = document.querySelector(obj.accordion);
  const accordionItem = accordion ? accordion.querySelectorAll('.accordionList') : '';
  const autoClose = obj.autoClose;
  const duration = obj.duration;
  const openFirst = obj.openFirst;
  const { open, close } = obj.info;

  function a11y() {
    if (Boolean(accordionItem)) {
      accordionItem.forEach((item, index) => {
        if (item.nextElementSibling === null) {
          return;
        }
        let content = item.nextElementSibling.querySelectorAll('a,input,select,textarea');

        let firstItem = false;

        if (!openFirst) {
          item.addEventListener('keydown', function (e) {
            if (e.which === 9 && !e.shiftKey) {
              autoClose && !openFirst ? closeOther(this) : '';
              openTarget(this);
              firstItem = false;
            } else if (e.which === 9 && e.shiftKey && !firstItem) {
              e.preventDefault();
              openTarget(this);
              autoClose && !openFirst ? closeOther(this) : '';

              if (content.length == 0) {
                accordionItem[index - 1].focus();
              } else if (content.length > 0) {
                content[content.length - 1].focus();
              }
            }
          });
          if (content.length !== 0) {
            content[0].addEventListener('keydown', function (e) {
              if (e.which === 9 && e.shiftKey && index !== 0) {
                e.preventDefault();
                accordionItem[index - 1].focus();
              } else if (e.which === 9 && e.shiftKey && index == 0) {
                firstItem = true;
                autoClose && !openFirst ? openTarget(accordionItem[0]) : '';
              }
            });
          }
        }
      });
    }
  }
  function info() {
    if (Boolean(accordionItem)) {
      accordionItem.forEach((item, index) => {
        let random = `accordion_${randomLetter(4)}${randomFloor(0, 9999)}`;
        item.innerHTML += `<span class="accordionState">${open}</span>`;
        item.innerHTML += `<span class="accordionArrow"></span>`;
        item.setAttribute('aria-expanded', 'false');
        item.setAttribute('aria-controls', random);
        if (item.parentElement.querySelector('.accordionContent') === null) {
          hideArrow(item);
          return;
        }
        item.parentElement.querySelector('.accordionContent').setAttribute('id', random);
        if (openFirst) {
          item.nextElementSibling.style.display = `block`;
        }
      });
    }
  }
  function clickFunction() {
    if (Boolean(accordionItem)) {
      accordionItem.forEach((item, index) => {
        item.addEventListener('click', function () {
          autoClose && !openFirst ? closeOther(this) : '';
          openTarget(this);
        });
      });
    }
  }
  function hideArrow(item) {
    let arrow = item.querySelector('.accordionArrow');
    arrow.classList.add('noItem');
  }
  function openTarget(item) {
    let content = item.nextElementSibling;
    if (content === null) {
      return;
    }
    let display = window.getComputedStyle(content).display;
    content.style.display = display;

    if (display === 'none') {
      display = 'block';
      item.parentNode.classList.add('active');
      item.setAttribute('aria-expanded', 'true');
      content.style.display = 'block';
      let contentHeight = content.scrollHeight;
      content.style.height = '0';
      content.style.transitionProperty = 'height';
      content.style.transitionDuration = `${duration}ms`;
      content.scrollHeight;
      item.querySelector('.accordionState').innerHTML = `${close}`;
      content.style.height = `${contentHeight}px`;
      setTimeout(() => {
        content.style.removeProperty('height');
        content.style.removeProperty('transition-duration');
        content.style.removeProperty('transition-property');
      }, duration);
    } else {
      let contentHeight = content.scrollHeight;
      content.style.height = `${contentHeight}px`;
      content.style.transitionProperty = 'height';
      content.style.transitionDuration = `${duration}ms`;
      content.scrollHeight;
      content.style.height = '0';
      item.querySelector('.accordionState').innerHTML = `${open}`;
      item.parentNode.classList.remove('active');
      item.setAttribute('aria-expanded', 'false');
      setTimeout(() => {
        content.style.removeProperty('height');
        content.style.removeProperty('display');
        content.style.removeProperty('transition-duration');
        content.style.removeProperty('transition-property');
      }, duration);
    }
  }
  function closeOther(item) {
    const siblings = [...item.parentNode.parentNode.children].filter((child) => {
      return child !== item.parentNode;
    });
    siblings.forEach((otherItem, index) => {
      let content = otherItem.querySelector('.accordionContent');
      if (content === null) {
        return;
      }
      if (content.style.Height !== 0 || content.style.Height !== null) {
        otherItem.querySelector('.accordionState').innerHTML = `${open}`;
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordionList').setAttribute('aria-expanded', 'false');
        let contentHeight = content.scrollHeight;
        content.style.height = `${contentHeight}px`;
        content.style.transitionProperty = 'height';
        content.style.transitionDuration = `${duration}ms`;
        content.scrollHeight;
        content.style.height = '0';
        setTimeout(() => {
          content.style.removeProperty('height');
          content.style.removeProperty('display');
          content.style.removeProperty('transition-duration');
          content.style.removeProperty('transition-property');
        }, duration);
      }
    });
  }
  (function () {
    clickFunction();
    a11y();
    info();
  })();
}
// 手風琴功能
accordionFunctions({
  accordion: '.nodeMenu .accordion',
  openFirst: false, // 預設先展開所有內容，使用無障礙遊走不再有手風琴效果，永遠展開內容(滑鼠點擊正常開合)
  autoClose: true, // 點擊時自動關閉已展開的項目，若需要此功能需要關閉openFirst
  duration: 200,
  info: {
    open: '', // 收合時顯示
    close: '', // 展開時顯示
  },
});
