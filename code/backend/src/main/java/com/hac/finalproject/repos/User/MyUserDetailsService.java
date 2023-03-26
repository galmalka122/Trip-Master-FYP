package com.hac.finalproject.repos.User;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.AuthorityUtils;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService /* implements UserDetailsService */ {

    @Autowired
    private DataSource dataSource;
    // @Autowired
    // private PasswordEncoder passwordEncoder;

    // @Override
    // public UserDetails loadUserByUsername(String username) throws
    // UsernameNotFoundException {
    // String query = "SELECT username, password, enabled FROM users WHERE username
    // = ?";
    // try (Connection connection = dataSource.getConnection();
    // PreparedStatement statement = connection.prepareStatement(query)) {
    // statement.setString(1, username);
    // ResultSet resultSet = statement.executeQuery();
    // if (!resultSet.next()) {
    // throw new UsernameNotFoundException("User not found: " + username);
    // }
    // String password = resultSet.getString("password");
    // boolean enabled = resultSet.getBoolean("enabled");
    // List<GrantedAuthority> authorities =
    // AuthorityUtils.createAuthorityList("ROLE_USER");
    // return new User(username, passwordEncoder.encode(password), enabled, true,
    // true, true, authorities);
    // } catch (SQLException e) {
    // throw new IllegalStateException("Error loading user by username", e);
    // }
    // }
}
