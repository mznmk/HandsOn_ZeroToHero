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

// [ helper function ]
function deleteScheduleAggregate(scheduleId, done, err) {
  const promiseCommentDestroy = Comment.findAll({
    where: {
      scheduleId: scheduleId
    }
  }).then((comments) => {
    return Promise.all(
      comments.map((c) => {
        return c.destroy();
      })
    );
  });

  Availability.findAll({
    where: {
      scheduleId: scheduleId
    }
  })
  .then((availabilities) => {
    const promises = availabilities.map((a) => {
      return a.destroy();
    });
    return Promise.all(promises);
  })
  .then(() => {
    return Candidate.findAll({
      where: {
        scheduleId: scheduleId
      }
    });
  })
  .then((candidates) => {
    const promises = candidates.map((c) => {
      return c.destroy();
    });
    promises.push(promiseCommentDestroy);
    return Promise.all(promises);
  })
  .then(() => {
    return Schedule.findByPk(scheduleId).then((s) => {
      return s.destroy();
    });
  })
  .then(() => {
    if (err)
      return done(err);
    done();
  });
}
