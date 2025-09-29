/**
* Template Name: Personal
* Updated: Aug 30 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
  

})()
function containsEmailChar(str) {
  return /^[a-zA-Z@.\d]+$/.test(str);
}
function containsNumbers(str) {
  return  /^[a-zA-Z\s]+$/.test(str);
}
function isBlank(str) {
  return  /^[\s]+$/.test(str);
}
function sub() {
  if(!nameValidate()){
    return false;}
  else if(!emailValidate()){
    return false;
  }
  document.getElementById('message').style.color='green';
  document.getElementById('message').innerText="sending..."
    $.ajax({
        url:"https://script.google.com/macros/s/AKfycbwbaZqTmqcvKB32XNt3ONN8Tzgov6NRyJK6Y4k6L2LxzwWF2VjeE9xceharJQMhuJHILg/exec",
        data:$("#contact-form").serialize(),
        method:"post",
        success:function (response){
          document.getElementById('message').innerText='sented'
            alert("Form submitted successfully")
             
        },
        error:function (err){
            alert("Something Error")

        }
    })

  return true;

}
function nameValidate(){
  var errorDisplay=document.getElementById('name-error-message')
  var v = ""
   v=document.forms['contact-form']['name'].value.trim()
  console.log(v);
  
  if(v.length<4)
  { 
    errorDisplay.innerText="the name have atleast 4 letters"
    errorDisplay.style.color='red';
    return false;
  }else if(!containsNumbers(v)){
    errorDisplay.innerText="the name only contain letters"
    errorDisplay.style.color='red';
     return false;
  }else if(isBlank(v)){
    errorDisplay.innerText="enter the name"
    errorDisplay.style.color='red';
     return false;
  }else {
    errorDisplay.innerText=""
   return true;}
}
function emailValidate() {
  var errorDisplay=document.getElementById('email-error-message')
  
  var v=document.forms['contact-form']['email'].value
  if (!containsEmailChar(v)||!v.includes("@")||!v.includes(".")||isBlank(v)) {
    errorDisplay.innerText="enter the correct email"
    errorDisplay.style.color='red';
  }
  else{
   errorDisplay.innerText=""
   return true;
  }
}
 function subjectValidate() {
  var errorDisplay=document.getElementById('subject-error-message')
  
  var v=document.forms['contact-form']['subject'].value

  if (v.length<4) {
    errorDisplay.innerText="enter minimum 4 characters in subject"
    errorDisplay.style.color='red';
  }else if(isBlank(v)){
    errorDisplay.innerText="enter the subject"
    errorDisplay.style.color='red';
  }else {
    errorDisplay.innerText=""
    return true
  }
 }
 function ageSetter(){
  var today = new Date();
  var birthDate = new Date("2005-02-29"); 
  var age = today.getFullYear() - birthDate.getFullYear();
  var ageComponent = document.getElementById('age-display');
  ageComponent.innerText=age;
  
 }

 Document.onload=ageSetter();