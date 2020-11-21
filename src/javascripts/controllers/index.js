export const indexPage = (req, res, next) => { //called by routes.js
    res.render('layout', {content: 'index', title: 'Top 10 Movies - Joe Dimmick'})
}

export const aboutPage = (req, res, next) => {
    res.render('layout', {content: 'about', title: 'Top 10 Movies - Joe Dimmick'})
}

export const contactPage = (req, res, next) => {
    res.render('layout', {content: 'contact', title: 'Top 10 Movies - Joe Dimmick'})
}

export const signInPage = (req, res, next) => {
    res.render('layout', {content: 'signin', title: 'Top 10 Movies - Joe Dimmick'})
}

export const signUpPage = (req, res, next) => {
    res.render('layout', {content: 'signup', title: 'Top 10 Movies - Joe Dimmick'})
}