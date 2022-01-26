/**
 * 查询片断
 */
export const sqlFragment = {
  user: `
    JSON_OBJECT(
      'id', user.id,
      'name', user.name
    ) as user
  `,
  leftJoinUser: `
    LEFT JOIN user
    ON user.id = post.userId
  `,
  leftJoinOneFile: `
    LEFT JOIN LATERAL (
      SELECT *
      FROM file
      WHERE file.postId = post.id
      ORDER BY file.id DESC
      LIMIT 1
    ) AS file
      ON file.postId = post.id
  `,
  file: `
    CAST(
      IF(
        COUNT(file.id),
        GROUP_CONCAT(
          DISTINCT JSON_OBJECT(
            'id', file.id
          )
        ),
        NULL
      ) as JSON
    ) as file,
    CAST(
      IF(
        COUNT(file.url),
        GROUP_CONCAT(
          DISTINCT JSON_OBJECT(
            'url', file.url
          )
        ),
        NULL
      ) as JSON
    ) as url
  `,
  leftJoinTag: `
    LEFT JOIN
      post_tag ON post_tag.postId = post.id
    LEFT JOIN
      tag ON post_tag.tagId = tag.id
  `,
  tags: `
    CAST(
      IF(
        COUNT(tag.id),
        CONCAT(
          '[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', tag.id,
                'name', tag.name
              )
            ),
          ']'
        ),
        NULL
      ) as JSON
    ) as tags
  `,
};