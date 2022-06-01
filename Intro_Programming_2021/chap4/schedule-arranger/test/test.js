'use strict';

// [ import module ]
const request = require('supertest');
const passportStub = require('passport-stub');
const assert = require('assert');
const app = require('../app');
const User = require('../models/user');
const Schedule = require('../models/schedule');
const Candidate = require('../models/candidate');
const Availability = require('../models/availability');
const Comment = require('../models/comment');
const deleteScheduleAggregate = require('../routes/schedules').deleteScheduleAggregate;

// [ test: /login ]
describe('/login', () => {
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ username: 'testuser' });
  });

  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  test('ログインのためのリンクが含まれる', () => {
    return request(app)
      .get('/login')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<a href="\/auth\/github"/)
      .expect(200);
  });

  test('ログイン時はユーザー名が表示される', () => {
    return request(app)
      .get('/login')
      .expect(/testuser/)
      .expect(200);
  });
});

// [ test: /logout ]
describe('/logout', () => {
  test('ログアウト時は / にリダイレクトされる', () => {
    return request(app)
      .get('/logout')
      .expect('Location', '/')
      .expect(302);
  })
});

// [ test: /schedules ]
describe('/schedules', () => {
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ id: 0, username: 'testuser' });
  });

  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  test('予定が作成でき、表示される', (done) => {
    User.upsert({ userId: 0, username: 'testuser' }).then(() => {
      request(app)
        .post('/schedules')
        .send({
          scheduleName: 'テスト予定１',
          memo: 'テストメモ１\r\nテストメモ２',
          candidates: 'テスト候補１\r\nテスト候補２\r\nテスト候補３'
        })
        .expect('Location', /schedules/)
        .expect(302)
        .end((err, res) => {
          const createdSchedulePath = res.headers.location;
          request(app)
            .get(createdSchedulePath)
            .expect(/テスト予定１/)
            .expect(/テストメモ１/)
            .expect(/テストメモ２/)
            .expect(/テスト候補１/)
            .expect(/テスト候補２/)
            .expect(/テスト候補３/)
            .expect(200)
            .end((err, res) => {
              deleteScheduleAggregate(createdSchedulePath.split('/schedules/')[1], done, err);
            });
        });
    });
  })
});

// [ test: /schedules/:scheduleId/users/:userId/candidates/:candidateId ]
describe('/schedules/:scheduleId/users/:userId/candidates/:candidateId', () => {
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ id: 0, username: 'testuser' });
  });

  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  test('出欠が更新できる', (done) => {
    User.upsert({ userId: 0, username: 'testuser' }).then(() => {
      request(app)
        .post('/schedules')
        .send({
          scheduleName: 'テスト出欠更新予定1',
          memo: 'テスト出欠更新メモ1',
          candidates: 'テスト出欠更新候補1' }
        )
        .end((err, res) => {
          const createdSchedulePath = res.headers.location;
          const scheduleId = createdSchedulePath.split('/schedules/')[1];
          Candidate.findOne({
            where: {
              scheduleId: scheduleId
            }
          }).then((candidate) => {
            // can update availability ?
            const userId = 0;
            request(app)
              .post(`/schedules/${scheduleId}/users/${userId}/candidates/${candidate.candidateId}`)
              .send({
                availability: 2
              })
              .expect('{"status":"OK","availability":2}')
              // .end((err, res) => {
              //   deleteScheduleAggregate(scheduleId, done, err);
              // });
              .end((err, res) => {
                Availability.findAll({
                  where: {
                    scheduleId: scheduleId
                  }
                }).then((availabilities) => {
                  assert.strictEqual(availabilities.length, 1);
                  assert.strictEqual(availabilities[0].availability, 2);
                  deleteScheduleAggregate(scheduleId, done, err);
                });
              });
          });
        });
    });
  });
});

// [ test: /schedules/:scheduleId/users/:userId/comments ]
describe('/schedules/:scheduleId/users/:userId/comments', () => {
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ id: 0, username: 'testuser' });
  });

  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  test('コメントが更新できる', (done) => {
    User.upsert(
      { userId: 0, username: 'testuser' }
    ).then(() => {
      request(app)
        .post('/schedules')
        .send({
          scheduleName: 'テストコメント更新予定１',
          memo: 'テストコメント更新メモ１',
          candidates: 'テストコメント更新候補１'
        })
        .end((err, res) => {
          const createdSchedulePath = res.headers.location;
          const scheduleId = createdSchedulePath.split('/schedules/')[1];
          // can update comment ?
          const userId = 0;
          request(app)
            .post(`/schedules/${scheduleId}/users/${userId}/comments`)
            .send({ comment: 'testcomment' })
            .expect('{"status":"OK","comment":"testcomment"}')
            .end((err, res) => {
              Comment.findAll({
                where: {
                  scheduleId: scheduleId
                }
              }).then((comments) => {
                assert.strictEqual(comments.length, 1);
                assert.strictEqual(comments[0].comment, 'testcomment');
                deleteScheduleAggregate(scheduleId, done, err);
              });
            });
        });
    });
  });
});

// [ test: /schedules/:scheduleId?edit=1 ]
describe('/schedules/:scheduleId?edit=1', () => {
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ id: 0, username: 'testuser' });
  });

  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  test('予定が更新でき、候補が追加できる', (done) => {
    User.upsert({ userId: 0, username: 'testuser' }).then(() => {
      request(app)
        .post('/schedules')
        .send({
          scheduleName: 'テスト更新予定１',
          memo: 'テスト更新メモ１',
          candidates: 'テスト更新候補１'
        })
        .end((err, res) => {
          const createdSchedulePath = res.headers.location;
          const scheduleId = createdSchedulePath.split('/schedules/')[1];
          request(app)
            .post(`/schedules/${scheduleId}?edit=1`)
            .send({
              scheduleName: 'テスト更新予定２',
              memo: 'テスト更新メモ２',
              candidates: 'テスト更新候補２'
            })
            .end((err, res) => {
              Schedule.findByPk(scheduleId).then((s) => {
                assert.strictEqual(s.scheduleName, 'テスト更新予定２');
                assert.strictEqual(s.memo, 'テスト更新メモ２');
              });
              Candidate.findAll({
                where: {
                  scheduleId: scheduleId
                },
                order: [
                  ['candidateId', 'ASC']
                ]
              }).then((candidates) => {
                assert.strictEqual(candidates.length, 2);
                assert.strictEqual(candidates[0].candidateName, 'テスト更新候補１');
                assert.strictEqual(candidates[1].candidateName, 'テスト更新候補２');
                deleteScheduleAggregate(scheduleId, done, err);
              })
            });
        });
    });
  });
});

// [ test: /schedules/:scheduleId?delete=1 ]
describe('/schedules/:scheduleId?delete=1', () => {
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ id: 0, username: 'testuser' });
  });

  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  test('予定に関する全ての情報が削除できる', (done) => {
    User.upsert({ userId: 0, username: 'testuser' }).then(() => {
      request(app)
        .post('/schedules')
        .send({
          scheduleName: 'テスト更新予定1',
          memo: 'テスト更新メモ1',
          candidates: 'テスト更新候補1'
        })
        .end((err, res) => {
          const createdSchedulePath = res.headers.location;
          const scheduleId = createdSchedulePath.split('/schedules/')[1];

          // 出欠作成
          const promiseAvailability = Candidate.findOne({
            where: {
              scheduleId: scheduleId
            }
          }).then((candidate) => {
            return new Promise((resolve) => {
              const userId = 0;
              request(app)
                .post(
                  `/schedules/${scheduleId}/users/${userId}/candidates/${candidate.candidateId}`
                )
                .send({ availability: 2 }) // 出席に更新
                .end((err, res) => {
                  if (err)
                    done(err);
                  resolve();
                });
            });
          });

          // コメント作成
          const promiseComment = new Promise(resolve => {
            const userId = 0;
            request(app)
              .post(`/schedules/${scheduleId}/users/${userId}/comments`)
              .send({ comment: 'testcomment' })
              .expect('{"status":"OK","comment":"testcomment"}')
              .end((err, res) => {
                if (err)
                  done(err);
                resolve();
              });
          });

          // 削除
          const promiseDeleted = Promise.all([
            promiseAvailability,
            promiseComment
          ]).then(() => {
            return new Promise(resolve => {
              request(app)
                .post(`/schedules/${scheduleId}?delete=1`)
                .end((err, res) => {
                  if (err)
                    done(err);
                  resolve();
                });
            });
          });

          // テスト
          promiseDeleted.then(() => {
            const p1 = Comment.findAll({
              where: { scheduleId: scheduleId }
            }).then(comments => {
              assert.strictEqual(comments.length, 0);
            });
            const p2 = Availability.findAll({
              where: { scheduleId: scheduleId }
            }).then(availabilities => {
              assert.strictEqual(availabilities.length, 0);
            });
            const p3 = Candidate.findAll({
              where: { scheduleId: scheduleId }
            }).then(candidates => {
              assert.strictEqual(candidates.length, 0);
            });
            const p4 = Schedule.findByPk(scheduleId).then(schedule => {
              assert.strictEqual(!schedule, true);
            });
            Promise.all([p1, p2, p3, p4]).then(() => {
              if (err) return done(err);
              done();
            });
          });
        });
    });
  });
});