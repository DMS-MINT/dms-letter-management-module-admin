# CRUD Checklist for Schemas

## Schema 1: Users

| Task       | Status                                 |
| ---------- | -------------------------------------- |
| **Create** | [x]                                    |
| **Read**   | [x]                                    |
| **Update** | [ ] Backend API is not implemented yet |
| **Delete** | [ ] Backend API is not implemented yet |

---

## Schema 2: Departments

| Task       | Status                            |
| ---------- | --------------------------------- |
| **Create** | [x]                               |
| **Read**   | [-] Some fields are not displayed |
| **Update** | [ ] Error occurred in the request |
| **Delete** | [x]                               |

---

## Schema 3: Enterprises / Client

| Task       | Status                                 |
| ---------- | -------------------------------------- |
| **Create** | [ ] Make sure to add TYPE FIELD        |
| **Read**   | [x]                                    |
| **Update** | [ ] Backend API is not implemented yet |
| **Delete** | [ ] Backend API is not implemented yet |

---

## Schema 4: Job Titles

| Task       | Status                                 |
| ---------- | -------------------------------------- |
| **Create** | [x]                                    |
| **Read**   | [x]                                    |
| **Update** | [ ] Backend API is not implemented yet |
| **Delete** | [x]                                    |

---

## Schema 5: Organizations

| Task       | Status                                 |
| ---------- | -------------------------------------- |
| **Create** | [x]                                    |
| **Read**   | [x]                                    |
| **Update** | [ ] Error occurred in the request      |
| **Delete** | [ ] Backend API is not implemented yet |

---

## Schema 6: Ref Config

| Task       | Status                            |
| ---------- | --------------------------------- |
| **Create** | [ ] Error occurred in the request |
| **Read**   | [x]                               |
| **Update** | [ ] Error occurred in the request |

---

## Schema 7: Date Config

| Task       | Status                            |
| ---------- | --------------------------------- |
| **Create** | [ ] Error occurred in the request |
| **Read**   | [x]                               |
| **Update** | [ ] Error occurred in the request |

---

## Schema 8: Authentication Login / Signup

| Task       | Status                                  |
| ---------- | --------------------------------------- |
| **Create** | [x]                                     |
| **Update** | [ ] Forget password not implemented yet |

---

## Schema 9: Signature

| Task       | Status                                 |
| ---------- | -------------------------------------- |
| **Create** | [ ] Backend API is not implemented yet |
| **Read**   | [ ] Backend API is not implemented yet |
| **Update** | [ ] Backend API is not implemented yet |
| **Delete** | [ ] Backend API is not implemented yet |

---

### TODO

- [ ] The domain sent from the backend is not the subdomain. It should be the subdomain of the user organization, so there must be a way to get the domain from the user organization.
- [ ] The department logo upload is not working from the backend.
- [ ] The Reference Number configuration and Date Configuration should have separate setups.
- [ ] The department get request should retrieve the department phone, email, and other details.
- [ ] Decide what to do with the password when creating a new user.
- [ ] Abbreviation characters should not be limited to specific characters.

This should render as expected in most markdown environments. Let me know if you need further adjustments!
