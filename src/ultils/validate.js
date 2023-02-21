export const validateLogin = (finalPayload, setInvalidFields, payload) => {
    let invalids = 0
    let fields = Object.entries(finalPayload)
    fields.forEach(i => {
        if (i[1] === '') {
            setInvalidFields(prev => [...prev, {
                field: i[0],
                msg: 'Không được bỏ trống trường này.'
            }])
            invalids++
        }
    })
    fields.forEach(i => {
        switch (i[0]) {
            case 'email':
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                let isEmail = regexEmail.test(i[1])
                if (!isEmail) {
                    setInvalidFields(prev => [...prev, {
                        field: i[0],
                        msg: 'Email không hợp lệ.'
                    }])
                    invalids++
                }
                break;
            case 'password':
                if (i[1]?.length < 6) {
                    setInvalidFields(prev => [...prev, {
                        field: i[0],
                        msg: 'Mật khẩu tối thiểu 6 ký tự.'
                    }])
                    invalids++
                }
                break
            case 'password2':
                if (i[1]?.length < 6) {
                    setInvalidFields(prev => [...prev, {
                        field: i[0],
                        msg: 'Mật khẩu tối thiểu 6 ký tự.'
                    }])
                    invalids++
                }
                if (payload.password !== payload.password2) {
                    setInvalidFields(prev => [...prev, {
                        field: i[0],
                        msg: 'Nhập lại mật khẩu không khớp.'
                    }])
                    invalids++
                }
                break;
            default:
                break;
        }
    })
    return invalids
}